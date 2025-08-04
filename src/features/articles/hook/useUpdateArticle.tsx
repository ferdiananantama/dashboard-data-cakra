"use client";
import { useState } from "react";
import { updateArticle } from "../api/artilces-api-repository";
import { ICreateArticleProps } from "../type";
import toast from "react-hot-toast";

export const useUpdateArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (id: string, data: ICreateArticleProps) => {
    try {
      setLoading(true);
      setError(false);
      await updateArticle(id, data);
      toast.success("Data successful updated");
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
