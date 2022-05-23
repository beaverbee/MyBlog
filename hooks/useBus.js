import {
  useContext,
  useReducer,
  useState,
  useEffect,
  createContext,
} from "react";
import { store, reducers } from "../utils/reducer";
import mitt from "mitt";

export const BusContext = createContext();

export function useBus() {
  return useContext(BusContext);
}

export function useListener(name, fn) {
  const bus = useBus();
  useEffect(() => {
    bus.on(name, fn);
    return () => {
      bus.off(name, fn);
    };
  }, [bus, name, fn]);
}

export function Provider({ children }) {
  const [bus] = useState(() => mitt());
  const [state, dispatch] = useReducer(reducers, store);
  return (
    <BusContext.Provider value={{ bus, state, dispatch }}>
      {children}
    </BusContext.Provider>
  );
}
