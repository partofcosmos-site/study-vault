import { Router } from "express";
import { solveProblem } from "../controllers/srController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/solve", requireAuth, solveProblem);

export default router;
