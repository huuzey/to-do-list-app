import { createContext, useState } from "react";

export const listcontext = createContext();

export const GlobalContext = ({ children }) => {
  const [lists, setlists] = useState([]);
  return (
    <listcontext.Provider value={{ lists, setlists }}>
      {children}
    </listcontext.Provider>
  );
};
