import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.ObjectId, ref: "Author", required: true },
  categories: [{ type: Schema.ObjectId, ref: "Category" }],
});

const Book = model("Book", bookSchema);
export default Book;
