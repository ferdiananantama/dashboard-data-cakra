"use client";
import { useState } from "react";
import { IAuthProps } from "../type";
import { registerApi } from "../api/auth-api-repository";
import toast from "react-hot-toast";

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (body: IAuthProps) => {
    try {
      setLoading(true);
      setError(false);
      await registerApi(body);
    } catch (err: any) {
      setError(true);
      console.error("Error fetching most popular articles:", err);
      toast.error(err.response.data.error);
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
