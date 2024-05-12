import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGINS || "[]"),
    credentials: true,
  }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
);

app.get("/", (req, res) => {
  res.json("Server is up 🔼");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀 ");
});

export default app;
