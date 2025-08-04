import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateArticle } from "../../hook/useCreateArticle";

export default function useModalAddArticle() {
  const {
    isOpen: isOpenConfirm,
    closeModal,
    openModal: openModalConfirm,
  } = useModal();

  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      cover_image_url: "",
      category: "",
    },
  });

  //Api's
  const apiRepo = useCreateArticle();

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

      await apiRepo.action(payload);
    } catch (error: any) {
      setErrorMessage(error.response.message);
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
    onClickConfirm,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    control,

    isOpenConfirm,
    closeModal,
    openModalConfirm,
  };
}
