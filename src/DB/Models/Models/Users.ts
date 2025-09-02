import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  author: { type: Schema.ObjectId, ref: "Author" },
});
const User = model("User", userSchema);
export default User;
