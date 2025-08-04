"use client";
import { useState } from "react";
import { createCategoryApi } from "../api/categories-api-repository";
import { ICreateCategory } from "../type";
import toast from "react-hot-toast";

export const useCreateCategories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (body: ICreateCategory) => {
    try {
      setLoading(true);
      setError(false);
      await createCategoryApi({
        name: body.name,
      });
      toast.success("Data successful created");
    } catch (err: any) {
      toast.error(err.response.data.error.message);
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
