import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Note from "../components/Note";
import Spinner from "../components/Spinner";

export type NoteType = {
  _id?: string;
  __v?: number;
  title: string;
  text: string;
  pinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function Home() {
  // const [notes, setNotes] = useState<NoteType[]>([]);

  // const [loading, setLoading] = useState<boolean>(true);

  const getNotes = async (): Promise<NoteType[]> => {
    try {
      const response = await axios.get("http://localhost:3000/notes/getAll");
      return response.data;
      // setLoading(false);
      // setNotes([...notes, ...response.data]);
    } catch (error: any) {
      console.error(error);
      return error;
    }
  };

  // useEffect(() => {
  //   getNotes();
  //   // return () => {
  //   //   second;
  //   // };
  // }, []);

  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-8 text-4xl">This is the homepage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((note: any) => (
          <Note
            key={note._id}
            title={note.title}
            text={note.text}
            _id={note._id}
            pinned={note.pinned}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
