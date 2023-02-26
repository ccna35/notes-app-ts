import axios from "axios";
import { useEffect, useState } from "react";
import Note from "../components/Note";

export type NoteType = {
  _id?: string;
  __v?: number;
  title: string;
  text: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const getNotes = async function getTutorial() {
    try {
      const response = await axios.get("http://localhost:3000/notes/getAll");
      console.log(response.data);
      setNotes([...notes, ...response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotes();
    // return () => {
    //   second;
    // };
  }, []);

  return (
    <div className="p-4 text-4xl bg-slate-400 rounded-sm">
      <h1 className="bg-red-500 mb-8">This is the homepage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Note
            key={note._id}
            title={note.title}
            text={note.text}
            pinned={note.pinned}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
