import { useState } from "react";
import { createStore } from "reusable";

export const connectedWallet = createStore(() => {
  // tslint:disable-next-line: react-hooks-nesting
  const [connectedWallet, setConnectedWallet] = useState(localStorage.getItem("connectedWallet"));
  // tslint:disable-next-line: no-shadowed-variable
  const handleSetWallet = (connectedWallet) => {
    localStorage.setItem("connectedWallet", connectedWallet);
    return setConnectedWallet(connectedWallet);
  };
  return [connectedWallet, handleSetWallet];
});
