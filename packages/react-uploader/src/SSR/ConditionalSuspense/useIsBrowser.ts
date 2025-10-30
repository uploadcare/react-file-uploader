import { useEffect, useState } from "react";

export const useIsBrowser = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  return isBrowser;
};
