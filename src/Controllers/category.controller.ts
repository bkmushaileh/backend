import { NextFunction, Request, Response } from "express";
import Category from "../DB/Models/Models/Category";
import { serverError } from "../Middleware/serverError";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await Category.find();
  try {
    if (!categories || categories.length === 0) {
      return next({ status: 404, message: "No categories were found!" });
    }
    return res.json({
      message: "All categories",
      categories,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const getCategoryByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return next({ status: 404, message: "Category not found!" });
    }
    return res.json({
      message: "Category by ID",
      category,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, books } = req.body;
  if (!name) {
    return next({ status: 404, message: "Category not found!" });
  }
  try {
    const newCategory = await Category.create({
      name,
      books,
    });
    return res.status(201).json({
      message: "Category has been created successfully!",
      author: newCategory,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return next({ status: 400, message: "Category not found!" });
    }
    if (!name) {
      return next({ status: 400, message: "Category name is required!" });
    }
    if (name) {
      category.name = name;
    }
    await category.save();
    return res.json({
      message: "Category has been updated successfully!",
      category,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return next({ status: 404, message: "Category not found!" });
    }
    await category.deleteOne();
    return res.json({ message: "Category updated successfully", category });
  } catch (error) {
    return serverError(next);
  }
};
