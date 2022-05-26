import { useContext, createContext } from "react";
import { menusList } from "../config";

const menuContext = createContext();

export function useBackStage() {
  return useContext(menuContext);
}

export function Provider(props) {
  const { children,logList } = props;
  return (
    <menuContext.Provider value={{ menusList, logList }}>
      {children}
    </menuContext.Provider>
  );
}
