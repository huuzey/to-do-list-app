import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import { listcontext } from "./reducer";
import Upload from "./pages/upload";
const BASE_URL = "https://to-do-list-app-ue7g.onrender.com";
export function App() {
  const { lists, setlists } = useContext(listcontext);

  const fetch = async () => {
    const data = await axios.get(`${BASE_URL}/get`);
    setlists(data?.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const addToDo = async (ons) => {
    console.log(ons);

    try {
      await axios.post(`${BASE_URL}/add`, ons);
      fetch();
      console.log("sent successfully");
    } catch (error) {
      console.log("ons reised");
    }
  };
  return (
    <div className="App">
      <Upload />
    </div>
  );
}
export default BASE_URL;
