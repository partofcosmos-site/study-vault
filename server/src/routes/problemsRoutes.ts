import { Router } from "express";
import {
  getAllProblems,
  getProblemById,
  createProblem,
} from "../controllers/problemsController";

const router = Router();

router.get("/", getAllProblems);
router.get("/:id", getProblemById);
router.post("/", createProblem); // Add auth middleware later

export default router;
