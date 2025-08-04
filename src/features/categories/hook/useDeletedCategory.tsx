"use client";
import { useState } from "react";
import { deleteCategoryApi } from "../api/categories-api-repository";
import toast from "react-hot-toast";

export const useDeletedCategories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (id: string) => {
    try {
      setLoading(true);
      setError(false);
      await deleteCategoryApi(id);
      toast.success("Data successful deleted");
    } catch (err: any) {
      toast.error(err.response.data.message);
      setError(true);
      console.error("Error fetching most popular articles:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    action: getData,
  };
};
