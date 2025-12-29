import { Orchestrator } from "./orchestrator";

async function main() {
  const orchestrator = new Orchestrator();

  // Basic argument parsing
  const args = process.argv.slice(2);

  if (args.includes("--watch")) {
    orchestrator.startWatchMode();
    // Keep process alive
    setInterval(() => {}, 1000 * 60 * 60);
  } else {
    const mode = args.includes("--monitor") ? "monitor-only" : "zero-to-hero";
    await orchestrator.runWorkflow(mode);
  }
}

main().catch((err) => console.error(err));
