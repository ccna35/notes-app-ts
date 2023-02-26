import dayjs from "dayjs";
import { FC, FunctionComponent } from "react";
import { NoteType } from "../pages/Home";

const Note: FunctionComponent<NoteType> = (note) => {
  const newDate = dayjs(note.createdAt).format("ddd MMM YYYY h:m A");

  console.log(newDate);

  return (
    <div className="p-5 flex flex-col items-start overflow-hidden rounded-md bg-white shadow-md duration-500 hover:shadow-xl">
      <h2 className="text-3xl">{note.title}</h2>
      <p className="mb-5 text-gray-700 text-lg">{note.text}</p>
      <p className="text-sm p-2 rounded-sm bg-slate-300">{newDate}</p>
    </div>
  );
};

export default Note;
