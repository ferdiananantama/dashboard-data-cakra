import { useModal } from "@/hooks/use-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCategories } from "../../hook/useCreateCategory";

export default function useModalAddCategory() {
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
    reset,
    formState: { errors },
  } = useForm({
    values: {
      name: "",
    },
  });

  //Api's
  const apiRepo = useCreateCategories();

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
      await apiRepo.action(payload);
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
    onClickConfirm,
    register,
    handleSubmit,
    watch,
    setValue,
    errors,

    isOpenConfirm,
    closeModal,
    openModalConfirm,
  };
}
