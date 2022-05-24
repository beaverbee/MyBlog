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

export function Provider(props) {
  const { children,state,dispatch } = props;
  const [bus] = useState(() => mitt());
  return (
    <BusContext.Provider value={{ bus, state, dispatch }}>
      {children}
    </BusContext.Provider>
  );
}
