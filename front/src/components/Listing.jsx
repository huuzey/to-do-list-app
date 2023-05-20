import axios from "axios";
import React, { useContext, useState } from "react";
import { listcontext } from "../reducer";
import BASE_URL from "../App";

const Listing = ({ list }) => {
  const [updating, setupdating] = useState(false);
  const [id, setid] = useState(null);
  const [uptext, setuptext] = useState("");
  const { lists, setlists } = useContext(listcontext);
  const fetch = async () => {
    const data = await axios.get(`${BASE_URL}/get`);

    setlists(data?.data);
  };

  const remover = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      fetch();
      console.log("deleted");
    } catch (error) {
      console.log(error);
    }
  };
  const updateclick = (id) => {
    setid(id);
    setupdating(true);
  };
  const update = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/${id}`, {
        title: uptext,
        status: false,
      });
      fetch();
      setupdating(false);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-4">
        {lists.length !== 0 && (
          <div className="text-black  m-2">
            Click on the text to update the task.
          </div>
        )}
        <div className="flex w-full items-center justify-center">
          {updating && (
            <>
              <input
                type="text"
                placeholder="what do you wanna do?"
                value={uptext}
                onChange={(e) => setuptext(e.target.value)}
                className="rounded-full bg-slate-500 p-2 shadow-xl w-1/3 flex   shadow-teal-600 border-collapse border-sky-400 "
              ></input>
              <button
                onClick={() => update(id)}
                className="px-3 my-2 bg-fuchsia-600 rounded-full ml-2 hover:bg-fuchsia-900 hover:scale-110"
              >
                done
              </button>
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          {lists?.map((list, index) => (
            <div key={index} className="flex items-center justify-center  ">
              <p className="text-black" onClick={() => updateclick(list._id)}>
                {list.title}
              </p>
              <button
                onClick={() => remover(list._id)}
                className="px-3 my-2 bg-fuchsia-600 rounded-full ml-2 hover:bg-fuchsia-900 hover:scale-110"
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Listing;
