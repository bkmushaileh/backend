import { model, Schema } from "mongoose";
import "./Book";

const authorSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  books: [{ type: Schema.ObjectId, ref: "Book" }],
  user: { type: Schema.ObjectId, ref: "User", unique: true },
});
const Author = model("Author", authorSchema);
export default Author;
