import axios from "axios";
import {
  IArticleDetailProps,
  IArticles,
  ICreateArticleProps,
  ICreateComment,
  IFilterArticleProps,
} from "../type";
import { useAuthStore } from "@/store/authStore";

const token = useAuthStore.getState().token;

export const fetchArticles = async (
  props: IFilterArticleProps
): Promise<IArticles> => {
  const res = await axios.get(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles",
    {
      params: props,
    }
  );
  return res.data;
};

export const fetchArticleDetail = async (
  id: string
): Promise<IArticleDetailProps> => {
  const res = await axios.get(
    `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const createArticle = async (
  data: ICreateArticleProps
): Promise<void> => {
  await axios.post(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles",
    {
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateArticle = async (
  id: string,
  data: ICreateArticleProps
): Promise<void> => {
  await axios.put(
    `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles/${id}`,
    {
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteArticle = async (id: string): Promise<void> => {
  await axios.delete(
    `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const createComment = async (data: ICreateComment): Promise<void> => {
  await axios.post(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/comments",
    {
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
