import express, { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByID,
  updateCategory,
} from "../Controllers/category.controller";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryByID);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
