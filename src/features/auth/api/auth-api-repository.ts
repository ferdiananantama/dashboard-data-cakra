import axios from "axios";
import { IAuthProps, ILoginResponse, IProfileProps } from "../type";
import { useAuthStore } from "@/store/authStore";

const token = useAuthStore.getState().token;

export const loginApi = async (body: IAuthProps): Promise<ILoginResponse> => {
  const res = await axios.post(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local",
    {
      identifier: body.identifier,
      password: body.password,
    }
  );
  return res.data;
};

export const registerApi = async (body: IAuthProps): Promise<void> => {
  const form = new URLSearchParams();
  form.append("email", body.email as string);
  form.append("password", body.password as string);
  form.append("username", body.username as string);

  axios.post(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local/register",
    form,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

export const profileApi = async (): Promise<IProfileProps> => {
  const res = await axios.get(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/users/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
