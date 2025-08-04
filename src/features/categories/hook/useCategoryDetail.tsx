"use client";
import { useEffect, useState } from "react";
import { fetchCategoriyDetailApi } from "../api/categories-api-repository";
import { ICategoryDetail } from "../type";

export const useCategoryDetail = (id: string) => {
  const [data, setData] = useState<ICategoryDetail>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await fetchCategoriyDetailApi(id as string);
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
