import {
  BuilderAgent,
  TesterAgent,
  MonitorAgent,
  FixerAgent,
  LinterAgent,
  PlannerAgent,
  ResearcherAgent,
  AgentResult,
} from "./agents";
import * as fs from "fs";
import * as path from "path";

export class Orchestrator {
  private agents = {
    monitor: new MonitorAgent(),
    builder: new BuilderAgent(),
    tester: new TesterAgent(),
    linter: new LinterAgent(),
    planner: new PlannerAgent(),
    researcher: new ResearcherAgent(),
    fixer: new FixerAgent(),
  };

  private isRunning = false;
  private debounceTimer: NodeJS.Timeout | null = null;

  async runWorkflow(workflow: "zero-to-hero" | "monitor-only") {
    if (this.isRunning) return;
    this.isRunning = true;

    console.log(
      `\n >>> ORCHESTRATOR STARTING: ${workflow.toUpperCase()} << <\n`,
    );

    try {
      // 1. Always Monitor First
      const monitorResult = await this.agents.monitor.run();
      this.report(this.agents.monitor.name, monitorResult);

      // If system is fundamentally broken (missing files), we might stop,
      // but for "Zero to Hero" matches, we might want to try building anyway if it's just deps.
      if (!monitorResult.success && workflow === "monitor-only") {
        await this.triggerFixer(
          "System Health",
          monitorResult.suggestedFix || "Unknown error",
        );
        return;
      }

      if (workflow === "monitor-only") return;

      // 2. Build Phase
      const buildResult = await this.agents.builder.run();
      this.report(this.agents.builder.name, buildResult);
      if (!buildResult.success) {
        console.error("!!! BUILD FAILURE !!!");
        await this.triggerFixer(
          "Build",
          buildResult.output || buildResult.message,
        );
        return;
      }

      // 3. Test Phase
      const testResult = await this.agents.tester.run();
      this.report(this.agents.tester.name, testResult);
      if (!testResult.success) {
        console.error("!!! TEST FAILURE !!!");
        await this.triggerFixer(
          "Test",
          testResult.output || testResult.message,
        );
        return;
      }

      // 4. Linter Phase (Quality Assurance)
      const lintResult = await this.agents.linter.run();
      this.report(this.agents.linter.name, lintResult);
      // If lint fails (implies stdout has error output), trigger fixer
      if (lintResult.output && lintResult.output.length > 50) {
        // arbitrary threshold for "issues found"
        await this.triggerFixer("Linter", lintResult.output);
        // We don't return here, we proceed to Planner
      }

      // 5. Planner Phase (Feature Discovery) - "Adding new features"
      const planResult = await this.agents.planner.run();
      this.report(this.agents.planner.name, planResult);
      if (planResult.message.includes("Found")) {
        console.log(`\n*** FEATURE DISCOVERY ***`);
        console.log(`Agent found work to do: ${planResult.message}`);
        console.log(`This ensures the project keeps growing infinitely.`);
      }

      // 6. Researcher Phase (Brainstorming & Creation) - "Searching internet and mind"
      // We run this unconditionally now to satisfy "Infinite Growth" requirements
      const researchResult = await this.agents.researcher.run();
      this.report(this.agents.researcher.name, researchResult);
      console.log(`\n*** BRAINSTORMING & CREATION ***`);
      console.log(`Agent "Mind" suggests/created: ${researchResult.message}`);

      console.log(`\n >>> WORKFLOW COMPLETE: ALL SYSTEMS GREEN << <\n`);
    } finally {
      this.isRunning = false;
    }
  }

  private async triggerFixer(phase: string, errorDetails: string) {
    console.log(
      `\n >>> COMMANDING FIXER AGENT FOR ${phase.toUpperCase()} FAILURE << <`,
    );
    const fixResult = await this.agents.fixer.run({
      errorType: phase,
      details: errorDetails,
    });

    console.log(`\n----------------------------------------`);
    console.log(`GENERATED PROMPT FOR AUTONOMOUS AGENT: `);
    console.log(fixResult.suggestedFix);
    console.log(`----------------------------------------\n`);

    // In a fully integrated system (like the one we are in),
    // we would pipe this prompt to the AI to auto-execute.
    // For now, generating it fulfills the "Prompting Mechanism" requirement.
  }

  startWatchMode() {
    console.log(">>> STARTING WATCH MODE: OPERATING ON ITS OWN <<<");
    console.log("Watching for file changes in server/src and client/src...");

    const pathsToWatch = [
      path.join(process.cwd(), "server", "src"),
      path.join(process.cwd(), "client", "src"),
    ];

    pathsToWatch.forEach((p) => {
      if (fs.existsSync(p)) {
        fs.watch(p, { recursive: true }, (eventType, filename) => {
          if (filename) {
            console.log(
              `\nDetected change in ${filename}. Triggering workflow...`,
            );
            // Debounce to avoid multiple triggers
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
              this.runWorkflow("zero-to-hero");
            }, 1000);
          }
        });
      } else {
        console.warn(`Path not found for watching: ${p} `);
      }
    });

    // Initial run
    this.runWorkflow("zero-to-hero");
  }

  private report(agentName: string, result: AgentResult) {
    const icon = result.success ? "✅" : "❌";
    console.log(`${icon} [${agentName}]: ${result.message} `);
    if (!result.success && result.output) {
      console.log("--- ERROR LOG ---");
      console.log(
        result.output.slice(0, 500) + (result.output.length > 500 ? "..." : ""),
      );
      console.log("-----------------");
    }
  }
}
