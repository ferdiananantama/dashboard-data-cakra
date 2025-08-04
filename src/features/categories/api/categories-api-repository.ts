import axios from "axios";
import { ICategoryDetail, ICategoryProps, ICreateCategory } from "../type";
import { useAuthStore } from "@/store/authStore";

const token = useAuthStore.getState().token;

export const fetchCategoriesApi = async (): Promise<ICategoryProps> => {
  const res = await axios.get(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories"
  );
  return res.data;
};

export const fetchCategoriyDetailApi = async (
  id: string
): Promise<ICategoryDetail> => {
  const res = await axios.get(
    `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

export const createCategoryApi = async (
  data: ICreateCategory
): Promise<void> => {
  await axios.post(
    "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories",
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

export const updateCategoryApi = async (
  documentId: string,
  data: ICreateCategory
): Promise<void> => {
  await axios.put(
    `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories/${documentId}`,
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

export const deleteCategoryApi = async (id: string): Promise<void> => {
  await axios.delete(
    `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
