"use client";
import { useEffect, useState } from "react";
import { IArticleDetailProps } from "../type";
import { fetchArticleDetail } from "../api/artilces-api-repository";

export const useArticleDetail = (id: string) => {
  const [data, setData] = useState<IArticleDetailProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await fetchArticleDetail(id as string);
      setData(result);
    } catch (err) {
      setError(true);
      console.error("Error fetching most popular articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const timeout = setTimeout(() => {
        getData();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: getData,
  };
};
