import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookByID,
  updateBookDetails,
} from "../Controllers/book.controller";
import upload from "../Middleware/multer";
const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookByID);
router.post("/", upload.single("image"), createBook);
router.put("/:id", updateBookDetails);
router.delete("/:id", deleteBook);

export default router;
