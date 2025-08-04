"use client";
import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCategoryDetail } from "../../hook/useCategoryDetail";
import { useUpdateCategories } from "../../hook/useUpdateCategory";
import { useSearchParams } from "next/navigation";

export default function useModalEditCategory() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;

  const {
    isOpen: isOpenConfirm,
    closeModal,
    openModal: openModalConfirm,
  } = useModal();

  //Api's
  const apiRepo = useUpdateCategories();
  const detail = useCategoryDetail(id as string);

  const {
    watch,
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      name: detail.data?.data.name || "",
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
        name: getValues("name"),
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

    onClickConfirm,
    isOpenConfirm,
    closeModal,
    openModalConfirm,
  };
}
