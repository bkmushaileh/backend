import express, { Router } from "express";
import {
  createCategorie,
  deleteCategory,
  getAllCategories,
  getCategoryByID,
  updateCategory,
} from "../Controllers/category.controller";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryByID);
router.post("/", createCategorie);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
