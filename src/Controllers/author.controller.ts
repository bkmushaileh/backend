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
    res.json(authors);
  } catch (error) {
    return next({ status: 500, message: "Something went wrong!" });
  }
};

export const getAuthorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return next({ status: 404, message: "Author not found!" });
    }
    res.json(author);
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

    await newAuthor.save();
    return res.status(201).json("Author has been created successfully!");
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

    return res.json("Author has been updated sucessfully!");
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
    return res.json("Author has been deleted successfully!");
  } catch (error) {
    return serverError(next);
  }
};
