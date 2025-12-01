import express from "express";
import {
  addComment,
  getRecipeComments
} from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:recipeId", getRecipeComments);
router.post("/", authMiddleware, addComment);

export default router;
