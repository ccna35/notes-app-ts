import axios from "axios";
import { useRef, useState } from "react";

export default function New() {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const titleRef = useRef(null);
  const textRef = useRef(null);

  const submitNewNote = async () => {
    console.log(titleRef.current);

    // try {
    //   const response = await axios.post("http://localhost:3000/notes/new", {
    //     title: titleRef.current
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="mt-10 sm:mt-0 sm:p-8">
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={submitNewNote}>
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      autoComplete="given-name"
                      placeholder="Note title..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      ref={titleRef}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <textarea
                      id="about"
                      name="about"
                      rows={15}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Write your note here..."
                      defaultValue={""}
                      ref={textRef}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
