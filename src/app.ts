import express from "express";
import connectDB from "./DB/Models/connectDB";
import morgan from "morgan";
import cors from "cors";
import { notFound } from "./Middleware/notFound";
import { errorHandler } from "./Middleware/errorHandler";
import authorsRouter from "./Routes/author.router";
import categoryRouter from "./Routes/category.router";
import bookRouter from "./Routes/book.router";
import authRouter from "./api/auth.router";

connectDB();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/authors", authorsRouter);
app.use("/categories", categoryRouter);
app.use("/books", bookRouter);
app.use("/auth", authRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
