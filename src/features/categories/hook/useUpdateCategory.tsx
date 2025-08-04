"use client";
import { useState } from "react";
import { updateCategoryApi } from "../api/categories-api-repository";
import { ICreateCategory } from "../type";
import toast from "react-hot-toast";

export const useUpdateCategories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (documentId: string, body: ICreateCategory) => {
    try {
      setLoading(true);
      setError(false);
      await updateCategoryApi(documentId, {
        name: body.name,
      });
      toast.success("Data successful updated");
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
