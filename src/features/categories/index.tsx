"use client";
import { Edit3Icon, Search, Trash, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PaginationView } from "@/components/PaginationView";
import { useModal } from "@/hooks/use-modal";
import ModalAddCategory from "./(modal)/add";
import ModalEditCategory from "./(modal)/edit";
import { useCategories } from "./hook/useListCategory";
import { useRouter, useSearchParams } from "next/navigation";
import ModalConfirm from "@/components/modals/modal-confirm";
import { useDeletedCategories } from "./hook/useDeletedCategory";

export default function CategoryDataView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    isOpen: isOpenModalAdd,
    closeModal: closeModalAdd,
    openModal: openModalAdd,
  } = useModal();

  const {
    isOpen: isOpenModalEdit,
    closeModal: closeModalEdit,
    openModal: openModalEdit,
  } = useModal();

  const {
    isOpen: isOpenModalDelete,
    closeModal: closeModalDelete,
    openModal: openModalDelete,
  } = useModal();

  const { watch, register, reset } = useForm({
    defaultValues: {
      q: "",
      name: "",
    },
  });

  //Api's
  const data = useCategories();
  const deleted = useDeletedCategories();

  const onClickEdit = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id);
    const queryString = params.toString();

    router.push(`?${queryString}`);
    openModalEdit();
  };

  const onClickDelete = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", id);
    const queryString = params.toString();

    router.push(`?${queryString}`);
    openModalDelete();
  };

  const onConfrimDelete = async () => {
    try {
      await deleted.action(searchParams.get("id") as string);
      data.refetch();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      closeModalDelete();
    }
  };

  return (
    <>
      <div className="py-3 mb-5">
        <div className="flex items-center justify-between gap-2">
          {/* 🔍 Search box */}
          <label className="flex flex-col min-w-40 h-12 w-full rounded-xl">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#4574a1] flex border-none bg-[#e6edf4] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <Search />
              </div>
              <input
                {...register("q")}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0c151d] focus:outline-0 focus:ring-0 border-none bg-[#e6edf4] focus:border-none h-full placeholder:text-[#4574a1] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Search for category..."
              />
              {watch("q") && (
                <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#e6edf4] pr-4">
                  <button
                    onClick={() => reset({ q: "" })}
                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-transparent text-[#0c151d] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0"
                  >
                    <X color="gray" />
                  </button>
                </div>
              )}
            </div>
          </label>

          <Button
            onClick={openModalAdd}
            className="h-12 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            Add Category
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {data.loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between py-2.5 px-4 bg-neutral-200 text-white rounded-lg items-center animate-pulse"
              >
                <div className="h-4 w-32 bg-white/40 rounded" />
                <div className="flex gap-1">
                  <div className="h-6 w-6 bg-white/40 rounded-sm" />
                  <div className="h-6 w-6 bg-white/40 rounded-sm" />
                </div>
              </div>
            ))
          : !data.error &&
            data.data?.data.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-2 px-4 bg-gray-300 text-black rounded-lg items-center"
              >
                <div className="font-medium leading-tight">{item.name}</div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => onClickEdit(item.documentId)}
                    className="p-0 rounded-sm bg-yellow-500"
                    size="sm"
                  >
                    <Edit3Icon size={24} />
                  </Button>
                  <Button
                    onClick={() => onClickDelete(item.documentId)}
                    className="p-0 rounded-sm bg-red-500"
                    size="sm"
                  >
                    <Trash size={24} />
                  </Button>
                </div>
              </div>
            ))}
        {data.error && (
          <div className="text-center text-sm text-red-500">
            Something went wrong, please try again later.
          </div>
        )}
        <PaginationView
          page={Number(data.data?.meta.pagination.page) || 1}
          limit={Number(data.data?.meta.pagination.pageSize) || 5}
          total={Number(data.data?.meta.pagination.total)}
        />
      </div>
      <ModalAddCategory
        closeModal={closeModalAdd}
        onSuccess={() => data.refetch()}
        isOpen={isOpenModalAdd}
      />
      <ModalEditCategory
        isOpen={isOpenModalEdit}
        closeModal={closeModalEdit}
        onSuccess={() => data.refetch()}
      />
      <ModalConfirm
        isOpen={isOpenModalDelete}
        onClose={closeModalDelete}
        onConfirm={() => onConfrimDelete()}
        title="Are you sure delete this category?"
        description="This action cannot be undone."
        loading={deleted.loading}
      />
    </>
  );
}
