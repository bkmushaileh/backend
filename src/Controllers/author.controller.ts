import { NextFunction, Request, Response } from "express";
import Author from "../DB/Models/Models/author";
import Book from "../DB/Models/Models/Book";

export const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find().populate(["books"]);
    if (!authors) {
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
  const { authorID } = req.params;
  try {
    const author = await Author.findById(authorID);
    if (!author) {
      return next({ status: 404, message: "Author not found!" });
    }
    res.json(author);
  } catch (error) {
    return next({ status: 500, message: "Something went wrong!" });
  }
};

export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAuthor = await Author.create(req.body);
    if (!newAuthor) {
      return next({ status: 404, message: "Author not found!" });
    }
  } catch (error) {}
};
