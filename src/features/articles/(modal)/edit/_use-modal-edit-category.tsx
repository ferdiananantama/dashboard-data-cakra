"use client";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useUpdateArticle } from "../../hook/useUpdateArticle";
import { useArticleDetail } from "../../hook/useArticleDetail";

export default function useModalEditArticle() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  const {
    isOpen: isOpenConfirm,
    closeModal,
    openModal: openModalConfirm,
  } = useModal();

  //Api's
  const apiRepo = useUpdateArticle();
  const detail = useArticleDetail(id as string);

  const {
    watch,
    register,
    getValues,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      category: detail.data?.data.category?.id.toString() || "",
      title: detail.data?.data.title || "",
      description: detail.data?.data.description || "",
      cover_image_url: detail.data?.data.cover_image_url || "",
    },
  });

  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onClickConfirm = (data: any, onSuccess?: () => void) => {
    if (onSuccess) {
      onSuccess();
    }

    openModalConfirm();
  };

  const onSubmit = async () => {
    setLoadingData(true);
    try {
      const payload = {
        title: getValues("title"),
        description: getValues("description"),
        cover_image_url: getValues("cover_image_url"),
        category: Number(getValues("category")),
      };

      await apiRepo.action(id, payload);
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setLoadingData(false);
      closeModal();
    } finally {
      setLoadingData(false);
      reset();
      closeModal();
    }
  };

  return {
    loadingData,
    errorMessage,

    onSubmit,
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    control,

    onClickConfirm,
    isOpenConfirm,
    closeModal,
    openModalConfirm,
  };
}
