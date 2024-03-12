import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { useRouter } from "next/router";

const HistoryContext = createContext(null);

const useHistoryContext = () => {
  const router = useRouter();
  const [history, setHistory] = useState([router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setHistory((history) => [...history, url]);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const historyContext = useMemo(
    () => ({
      history,
    }),
    [history]
  );
  return historyContext;
};

export const useHistory = () => {
  return useContext(HistoryContext);
};

export const HistoryProvider = ({ children }) => {
  const historyContext = useHistoryContext();

  return (
    <HistoryContext.Provider value={historyContext}>
      {children}
    </HistoryContext.Provider>
  );
};
