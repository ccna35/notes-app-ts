import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Note } from "./types";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";

dotenv.config();

const app: Express = express();

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

app.listen(3000, () => {
  console.log(`Server is running at 3000`);
});
