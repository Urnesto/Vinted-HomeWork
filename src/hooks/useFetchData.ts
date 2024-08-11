import { useCallback, useEffect, useState } from "react";
import { IPhoto, FetchHookData } from "../types";

const useFetch = (page: number): FetchHookData => {
  const [data, setData] = useState<IPhoto[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagesFetched, setPagesFetched] = useState<number[]>([]);

  const PER_PAGE = 10;
  const API_KEY = "a3a4c4d1713708b3a7eb447250a9ce2a"; //API keys should always be placed in a .env file. I didn't place it there to showcase the application functionality.
  const fetchData = useCallback(async () => {
    if (pagesFetched.includes(page)) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&extras=owner_name&page=${page}&per_page=${PER_PAGE}&format=json&nojsoncallback=1`
      );
      const result = await response.json();

      setData((prev) => [...prev, ...result.photos.photo]);
      setPagesFetched((prev) => [...prev, page]);
    } catch (error) {
      setError(true);
      console.error(`Error fetching page ${page}:`, error);
    } finally {
      setLoading(false);
    }
  }, [page, pagesFetched]);

  useEffect(() => {
    if (page > 0) fetchData();
  }, [fetchData, page]);

  return { data, error, loading, lastImageElementRef: () => {} };
};

export default useFetch;
