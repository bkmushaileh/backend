import { NextFunction, Request, Response } from "express";
import Author from "../DB/Models/Models/Author";
import { serverError } from "../Middleware/serverError";

export const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find().populate("books");

    if (!authors || authors.length === 0) {
      return next({ status: 404, message: "No authors were found!" });
    }
    return res.json({
      message: "All authors",
      authors,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const getAuthorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.params.id).populate("books");
    if (!author) {
      return next({ status: 404, message: "Author not found!" });
    }
    return res.json({
      message: "Author by ID",
      author,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, country, books } = req.body;
    const newAuthor = await Author.create({ name, country, books });
    if (!newAuthor) {
      return next({ status: 404, message: "Author not found!" });
    }

    newAuthor.save();
    return res.status(201).json({
      message: "Author has been created successfully!",
      author: newAuthor,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const author = await Author.findById(id);
    if (!author) {
      return next({ status: 404, message: "Author not found!" });
    }
    if (name) {
      author.name = name;
    }
    await author.save();
    return res.json({
      message: "Author has been updated successfully!",
      author,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    if (!author) {
      return next({ status: 404, message: "Author not found!" });
    }
    await author.deleteOne();
    return res.json({
      message: "Author has been deleted successfully!",
      author,
    });
  } catch (error) {
    return serverError(next);
  }
};
