"use client";
import { useState } from "react";
import { ICreateComment } from "../type";
import { createComment } from "../api/artilces-api-repository";
import toast from "react-hot-toast";

export const useCreateComment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (body: ICreateComment) => {
    try {
      setLoading(true);
      setError(false);
      await createComment({
        article: body.article,
        content: body.content,
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
