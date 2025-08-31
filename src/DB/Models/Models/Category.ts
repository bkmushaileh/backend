import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  books: [{ type: Schema.ObjectId, ref: ["Book"] }],
});

const Category = model("Category", categorySchema);
export default Category;
