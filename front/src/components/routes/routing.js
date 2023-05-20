import React from "react";
import { Route, Routes } from "react-router-dom";
import Upload from "../Input";

const routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
};

export default routing;
