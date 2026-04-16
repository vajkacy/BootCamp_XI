import { useState, useEffect, useCallback } from "react";

const useFetchCourses = (apiFunction) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    // Check if apiFunction actually exists and is a function before calling it
    if (typeof apiFunction !== "function") return;
    setLoading(true);
    try {
      const res = await apiFunction();
      setData(res.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, refetch: loadData };
};

export default useFetchCourses;
