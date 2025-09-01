import { NextFunction, Request, Response } from "express";
import { serverError } from "../Middleware/serverError";
import Book from "../DB/Models/Models/Book";
import Author from "../DB/Models/Models/Author";
import Category from "../DB/Models/Models/Category";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find().populate(["author", "categories"]);
    if (!books || books.length === 0) {
      return next({ status: 404, message: "No books were found!" });
    }
    return res.json({
      message: "All books",
      books,
    });
  } catch (error) {
    return serverError(next);
  }
};
export const getBookByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate(["author", "categories"]);
    if (!book) {
      return next({ status: 404, message: "No books were found!" });
    }
    return res.json({
      message: "Book by ID",
      book,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, categories, image } = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const authorFound = await Author.findById(author);
    if (!authorFound) {
      return next({ status: 404, message: "Author were not found!" });
    }
    const book = await Book.create({
      title,
      author: authorFound._id,
      categories,
      image: imagePath,
    });

    authorFound.books.push(book._id);
    await authorFound.save();
    await Category.updateMany(
      { _id: { $in: categories } },
      { $addToSet: { books: book.id } }
    );
    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return serverError(next);
  }
};

export const updateBookDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return next({ status: 404, message: "Book were not found!" });
    }
    book.title = title;
    await book.save();
    return res.json({ message: "Book has been updated successfully!", book });
  } catch (error) {
    return serverError(next);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return next({ status: 404, message: "Book not found!" });
    }
    await Author.findByIdAndUpdate(book.author, {
      $pull: { books: book._id },
    });
    await Category.updateMany(
      { _id: { $in: book.categories } },
      { $pull: { books: book._id } }
    );
    await book.deleteOne();
    return res.json({
      message: "Book has been deleted successfully!",
      book,
    });
  } catch (error) {
    return serverError(next);
  }
};
