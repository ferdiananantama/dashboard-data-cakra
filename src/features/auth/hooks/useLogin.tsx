"use client";
import { useState } from "react";
import { IAuthProps } from "../type";
import { loginApi } from "../api/auth-api-repository";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async (body: IAuthProps) => {
    try {
      setLoading(true);
      setError(false);
      const res = await loginApi(body);
      if (res.jwt) {
        setToken(res.jwt);
      } else {
        console.error("Login failed or no token returned");
      }
      toast.success("Login successfully");
    } catch (err: any) {
      toast.error(err.response.data.error);
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
