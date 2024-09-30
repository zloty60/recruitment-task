import { useState, useEffect } from "react";

function getRandomIndexFromArray(arrLength) {
  return Math.floor(Math.random() * arrLength);
}

export default function useFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [link, setLink] = useState("");

  useEffect(() => {
    let didCancel = false;
    async function fetchData() {
      setLoading(true);
      setData(null);
      setError(null);
      try {
        const response = await fetch(
          `https://enterprise.gridaly.com/frontend/articles.json`
        );
        if (!didCancel) {
          const json = await response.json();
          console.log(json);
          setLoading(false);
          setData(json);
          const linkIndex = getRandomIndexFromArray(json.length);
          setLink(json[linkIndex].url);
        }
      } catch (error) {
        if (!didCancel) {
          setLoading(false);
          setError(true);
          console.error(error);
        }
      }
    }
    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  return { link, loading, error };
}
