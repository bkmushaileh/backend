import { NextFunction, Request, Response } from "express";
import User from "../DB/Models/Models/Users";
import { serverError } from "../Middleware/serverError";
import { generateHashPassword } from "../utils/hashPassword";
import Author from "../DB/Models/Models/Author";
import { generatetoken } from "../utils/jwt";
import bcrypt from "bcrypt";

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
    const hashedPassword = await generateHashPassword(password);

    const newAuthor = new Author({
      name: username,
      country: country || "Unknown",
      books: [],
    });

    const newUser = new User({
      username: username,
      password: hashedPassword,
      author: newAuthor._id,
    });
    newAuthor.user = newUser._id;
    await newUser.save();
    await newAuthor.save();

    const token = generatetoken(newUser._id, username);
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
    console.log(error);
    return serverError(next);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        message: "Invalid Credintials",
        status: 400,
      });
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next({
        message: "User not Exists!",
        status: 400,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generatetoken(user._id, username);
    return res.status(201).json({
      message: "login successfully!",
      token,
    });
  } catch (error) {
    return serverError(next);
  }
};
