import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { NoteType } from "./Home";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function New() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const titleRef = useRef<HTMLInputElement>();
  const textRef = useRef<HTMLInputElement>();

  // const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setTitle(e.target.value);
  // };

  // const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   console.log(e.target.value);
  //   setText(e.target.value);
  // };

  const navigate = useNavigate();

  const submitNewNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(titleRef.current.value);
    console.log(textRef.current.value);

    try {
      const response = await axios.post<NoteType>(
        "http://localhost:3000/notes/new",
        {
          title: titleRef.current.value,
          text: textRef.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // redirect("/home");
      // <Navigate to="/home" replace={true} />;
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitNewNote,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className="mt-10 sm:mt-0 sm:p-8">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form method="POST" onSubmit={(e) => submitNewNote(e)}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      placeholder="Note title..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ref={titleRef}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <textarea
                      id="noteText"
                      name="noteText"
                      rows={15}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Write your note here..."
                      ref={textRef}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <button
                  type="submit"
                  className="text-left inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add New Note
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
