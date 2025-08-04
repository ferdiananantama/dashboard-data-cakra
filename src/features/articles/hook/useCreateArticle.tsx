"use client";
import { useState } from "react";
import { ICreateArticleProps } from "../type";
import { createArticle } from "../api/artilces-api-repository";
import toast from "react-hot-toast";

export const useCreateArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (body: ICreateArticleProps) => {
    try {
      setLoading(true);
      setError(false);
      await createArticle({
        category: body.category,
        title: body.title,
        description: body.description,
        cover_image_url: body.cover_image_url,
      });
      toast.success("Data successful created");
    } catch (err: any) {
      toast.error(err.response.data.error.message);
      setError(true);
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
