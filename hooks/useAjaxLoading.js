import { useState } from "react";

export default function useRequestLoading() {
  const [loading, setLoading] = useState(false);
  function withLoading(request) {
    if (request instanceof Promise) {
      return new Promise((resolve, reject) => {
        setLoading(true);
        request
          .then((res) => {
            resolve(res);
            setLoading(false);
          })
          .catch((error) => {
            reject(error);
            setLoading(false);
          });
      });
    }
  }
  return [loading, withLoading];
}
