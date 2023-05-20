import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import { getLists } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Upload from "./components/Input";
const BASE_URL = "https://to-do-list-app-ue7g.onrender.com";
function App() {
  const dispatch = useDispatch();
  const { lists } = useSelector((store) => store.list);

  useEffect(() => {
    dispatch(getLists());
  }, []);

  const addToDo = async (ons) => {
    console.log(ons);

    try {
      await axios.post(`${BASE_URL}/add`, ons);
      dispatch(getLists());

      console.log("sent successfully");
    } catch (error) {
      console.log("ons reised");
    }
  };
  return (
    <div className="App">
      <Upload />{" "}
    </div>
  );
}

export default { App, BASE_URL };
