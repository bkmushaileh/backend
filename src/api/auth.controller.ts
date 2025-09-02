import { NextFunction, Request, Response } from "express";
import User from "../DB/Models/Models/Users";
import { serverError } from "../Middleware/serverError";
import { generateHashPassword } from "../utils/hashPassword";
import Author from "../DB/Models/Models/Author";
import { generatetoken } from "../utils/jwt";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    if (!users) {
      return next({
        message: "No users found",
        status: 404,
      });
    }
    return res.json({
      message: "All Users",
      users,
    });
  } catch (error) {
    return serverError(next);
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, country } = req.body;
    if (!username || !password) {
      return next({
        message: "Invalid Credintials",
        status: 400,
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return next({
        message: "User Already Exists!",
        status: 400,
      });
    }
    const hashedPassword = generateHashPassword(password);

    const newAuthor = new Author({
      name: username,
      country: country || "Unknown",
      books: [],
    });
    await newAuthor.save();

    const newUser = new User({
      username: username,
      password: hashedPassword,
      author: newAuthor._id,
    });
    await newAuthor.save();

    const token = generatetoken(newUser, username);
    return res.status(201).json({
      message: "User and associated author created successfully!",
      user: {
        id: newUser._id,
        username: newUser.username,
        author: newAuthor._id,
      },
      token,
    });
  } catch (error) {
    return serverError(next);
  }
};
