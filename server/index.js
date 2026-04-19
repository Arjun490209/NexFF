import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRouter from "./routes/auth.route.js";

const app = express();

const port = 3000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`server running port - ${port}`);
});
