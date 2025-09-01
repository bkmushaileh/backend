import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorByID,
  updateAuthor,
} from "../Controllers/author.controller";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorByID);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
export default router;
