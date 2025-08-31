import express from "express";
import { getAllAuthors, getAuthorByID } from "../Controllers/author.controller";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorByID);

export default router;
