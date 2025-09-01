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
    if (!categories) {
      return next({ status: 404, message: "No categories were found!" });
    }
    return res.json(categories);
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
    return res.json(category);
  } catch (error) {
    return serverError(next);
  }
};

export const createCategorie = async (
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
    newCategory.save();
    return res.status(201).json("Category has been created successfully!");
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
      return next({ status: 404, message: "Category not found!" });
    }
    if (name) {
      category.name = name;
    }
    await category.save();
    return res.json("Category has been updated sucessfully!");
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
    const category = Category.findById(id);
    if (!category) {
      return next({ status: 404, message: "Category not found!" });
    }
    await category.deleteOne();
    return res.json("Category has been deleted successfully!");
  } catch (error) {
    return serverError(next);
  }
};
