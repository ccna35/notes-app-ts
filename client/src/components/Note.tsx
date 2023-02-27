import axios from "axios";
import dayjs from "dayjs";
import { ErrorInfo, FC, FunctionComponent } from "react";
import { NoteType } from "../pages/Home";

const Note: FunctionComponent<NoteType> = (note) => {
  const newDate = dayjs(note.createdAt).format("ddd MMM YYYY h:m A");

  const handleDelete = async (id: string | undefined) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/notes/delete/${id}`
      );
      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-5 flex flex-col justify-between overflow-hidden rounded-md bg-white shadow-sm duration-500 hover:shadow-lg border">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl">{note.title}</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:text-red-600 transition"
          onClick={() => handleDelete(note._id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <p className="text-gray-700 text-lg self-start">{note.text}</p>
      <p className="text-sm p-2 rounded-sm bg-slate-200 self-start">
        {newDate}
      </p>
    </div>
  );
};

export default Note;
