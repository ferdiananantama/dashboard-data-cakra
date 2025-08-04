// useListArticle.ts
import { useEffect, useState } from "react";
import { IArticles, IFilterArticleProps } from "../type";
import { fetchArticles } from "../api/artilces-api-repository";

export const useListArticles = (props: IFilterArticleProps) => {
  const [data, setData] = useState<IArticles["data"]>([]);
  const [meta, setMeta] = useState<IArticles["meta"]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState(1);

  const getData = async (append = false) => {
    try {
      setLoading(true);
      setError(false);

      const result = await fetchArticles({
        ...props,
        "pagination[page]": page,
        "pagination[pageSize]": props["pagination[pageSize]"] || 10,
      });

      setData((prev) => (append ? [...prev, ...result.data] : result.data));
      setMeta(result.meta);
    } catch (err) {
      setError(true);
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData(page > 1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [page]);

  return {
    data,
    meta,
    loading,
    error,
    setPage,
    page,
    refetch: () => getData(false),
  };
};
