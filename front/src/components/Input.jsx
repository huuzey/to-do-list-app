import React, { useContext, useState } from "react";
import BASE_URL from "../App";
import axios from "axios";
import { listcontext } from "../reducer";

const Upload = () => {
  const { lists, setlists } = useContext(listcontext);

  const [fileInputState, setFileInputState] = useState("");
  const fetch = async () => {
    const data = await axios.get(`${BASE_URL}/get`);
    setlists(data?.data);
    setFileInputState("");
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (fileInputState) {
      try {
        await axios.post(`${BASE_URL}/add`, { title: fileInputState });
        fetch();
        console.log("sent successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitFile} className="form">
        <input
          type="text"
          name="text"
          placeholder="what do you wanna do ?"
          onChange={(e) => setFileInputState(e.target.value)}
          value={fileInputState}
          className="bg-slate-300 text-black mx-2 px-4 rounded-lg mt-4 "
        />
        <button
          className="bg-[#a01094] rounded-lg px-2 hover:scale-110 hover:text-[#16b288]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
