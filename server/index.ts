import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Note } from "./types";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());

const notes: Note[] = [];

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

// app.get("/notes", (req: Request, res: Response) => {
//   res.send(notes);
// });

// app.post("/notes", (req: Request, res: Response) => {
//   console.log(req.body);
//   notes.push(req.body);
//   res.sendStatus(200);
// });

const DB_URI: string | undefined = process.env.DB_URI;

mongoose.set("strictQuery", false); // this line suppresses the deprecation warning.
mongoose
  .connect(DB_URI!)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));

// console.log(typeof process.env.DB_URI);
