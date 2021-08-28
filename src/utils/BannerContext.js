import React, { useContext, useState } from "react";

const BannerContext = React.createContext();

export function useBanner() {
  return useContext(BannerContext);
}

export function BannerProvider({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState(null);

  const emitSuccessMsg = (message) => {
    setIsSuccess(true);
    setMsg(message);
  };

  const emitErrorMsg = (message) => {
    setIsSuccess(false);
    setMsg(message);
  };

  const clearMsg = () => {
    setIsSuccess(false);
    setMsg(null);
  };

  const value = {
    isSuccess,
    msg,
    emitSuccessMsg,
    emitErrorMsg,
    clearMsg,
  };

  return (
    <BannerContext.Provider value={value}>{children}</BannerContext.Provider>
  );
}
