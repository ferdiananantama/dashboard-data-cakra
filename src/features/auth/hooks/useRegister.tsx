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
      toast.success("Register Successfully");
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
