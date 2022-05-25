import { useEffect } from "react";
import { GET_CITY } from "../config";
import axios from '../utils/axios'
const IP_URL = "https://restapi.amap.com/v3/ip?"; //IP api请求url
export const KEY = "602d9e141dd2898214373b04d65121a8"; //高德地图个人key

export function useCity(dispatch) {
  useEffect(() => {
    async function getCity() {
      const data = await axios.get(IP_URL + "key=" + KEY);
      if (data.status === "1") {
        dispatch({ type: GET_CITY, value: data.city });
      }
    }
    getCity();
  }, [dispatch]);
}
