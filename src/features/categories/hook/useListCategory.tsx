"use client";
import { useEffect, useState } from "react";
import { fetchCategoriesApi } from "../api/categories-api-repository";
import { ICategoryProps, IFilterCategory } from "../type";

export const useCategories = () => {
  const [data, setData] = useState<ICategoryProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await fetchCategoriesApi();
      setData(result);
    } catch (err) {
      setError(true);
      console.error("Error fetching most popular articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return {
    data,
    loading,
    error,
    refetch: getData,
  };
};
