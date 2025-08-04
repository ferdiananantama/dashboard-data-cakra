"use client";
import { useEffect, useState } from "react";
import { IProfileProps } from "../type";
import { profileApi } from "../api/auth-api-repository";

export const useProfile = () => {
  const [data, setData] = useState<IProfileProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      const result = await profileApi();
      setData(result);
    } catch (err) {
      setError(true);
      console.error("Error fetching most popular articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error, refetch: getData };
};
