"use client";
import { profileApi } from "@/features/auth/api/auth-api-repository";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProtectRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: ProtectRouteProps) => {
  const route = useRouter();
  const [token, setToken] = useState<string>("");
  const [_, setLoading] = useState<boolean>(true);

  const getMe = async () => {
    setLoading(true);
    try {
      await profileApi();
      route.push("/dashboard/articles");
      setLoading(false);
    } catch (error) {
      route.push("/auth/login");
      setLoading(false);
      throw new Error("error");
    }
  };

  useEffect(() => {
    getMe();
  }, [token]);

  useEffect(() => {
    const getLocalStorage = useAuthStore.getState().token;
    if (!!getLocalStorage) {
      const tokenLocalStorage = JSON.parse(getLocalStorage)?.token;
      if (!!tokenLocalStorage) {
        setToken(tokenLocalStorage);
      }
    }
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
