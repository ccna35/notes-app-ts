import { Request, Response } from "express";
import Note from "../models/noteModel";

export const createNote = async (req: Request, res: Response) => {
  console.log(req.body);
  const note = new Note({
    title: req.body.title,
    text: req.body.text,
  });

  try {
    await note.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    res.send(await Note.find());
  } catch (error) {
    console.log(error);
  }
};
