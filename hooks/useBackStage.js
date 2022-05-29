import { useContext, createContext } from "react";
import { menusList } from "../config";

const menuContext = createContext();

export function useBackStage() {
  return useContext(menuContext);
}

export function Provider(props) {
  const { children } = props;
  return (
    <menuContext.Provider value={{ ...props, menusList }}>
      {children}
    </menuContext.Provider>
  );
}
