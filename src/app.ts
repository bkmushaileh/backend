import express from "express";
import connectDB from "./DB/Models/connectDB";
import morgan from "morgan";
import cors from "cors";
import { notFound } from "./Middleware/notFound";
import { errorHandler } from "./Middleware/errorHandler";
import authorsRouter from "./Routes/author.router";

connectDB();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(errorHandler);

app.use("/authors", authorsRouter);

app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
