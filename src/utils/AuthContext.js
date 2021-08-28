import React, { useContext } from "react";
import useLocalStorage from "./useLocalStorage";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [username, setUsername] = useLocalStorage("username", null);

  function logIn(uname) {
    console.log("context uname", uname);
    setLoggedIn(true);
    setUsername(uname);
  }

  function logOut() {
    setLoggedIn(false);
    setUsername(null);
  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    loggedIn,
    username,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
