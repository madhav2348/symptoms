import { useCallback, useState } from "react";

export function useRefresh(){
    const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = useCallback (() => {
    setRefreshKey(prev => prev + 1);
  }, []);
  return { refreshKey , handleDataChange}
}