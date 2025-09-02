import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_URL) {
  throw new Error("Missing DB_URL in environment");
}

if (!process.env.JWT) {
  throw new Error("Missing JWT in environment");
}
export const env = {
  PORT: process.env.PORT || "5000",
  DB_URL: process.env.DB_URL,
  JWT: process.env.JWT,
  JWT_Secret: process.env.JWT_Secret,
};
