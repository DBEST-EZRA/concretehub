import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const dummyUsers = [
  { email: "finance", password: "123", role: "finance" },
  { email: "driver", password: "123", role: "driver" },
  { email: "admin", password: "123", role: "admin" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const foundUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
