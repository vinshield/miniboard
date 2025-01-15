import React, { createContext, useState, useContext } from "react";
import { useUser as clerkUser } from "@clerk/clerk-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user } = clerkUser();
  //   const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
