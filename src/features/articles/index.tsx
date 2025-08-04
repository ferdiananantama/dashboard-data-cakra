"use client";
import Image from "next/image";
import { useListArticles } from "./hook/useListArticle";
import SkeletonCard from "@/components/SkeletonCard";
import { useRouter, useSearchParams } from "next/navigation";
import ModalAddArticle from "./(modal)/add";
import { useModal } from "@/hooks/use-modal";
import ModalEditArticle from "./(modal)/edit";
import ModalConfirm from "@/components/modals/modal-confirm";
import { Button } from "@/components/ui/button";
import { Edit3Icon, Trash } from "lucide-react";
import { useDeletedArticle } from "./hook/useDeletedArtcile";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useCreateComment } from "./hook/useCreateComment";

export type LocalComment = {
  id: number;
  content: string;
};

export default function ArticleView() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [commentValue, setCommentValue] = useState<string>("");

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

  //Api's
  const deleted = useDeletedArticle();
  const {
    data: articles,
    meta,
    loading,
    setPage,
    page,
    refetch,
  } = useListArticles({
    "pagination[pageSize]": 6,
    populate: "*",
  });
  const comment = useCreateComment();

  const { register, handleSubmit, setValue, reset, getValues } = useForm({
    defaultValues: {
      content: "",
      article: "",
    },
  });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && !loading && meta && page < meta.pagination.pageCount) {
      setPage(page + 1);
    }
  }, [inView, loading, page, meta, setPage]);

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
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      closeModalDelete();
    }
  };

  return (
    <>
      <div title="Featured Articles">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
          <h2 className="text-[#0c151d] text-xl font-semibold leading-tight tracking-[-0.015em] mb-0">
            All Articles
          </h2>
          <Button
            onClick={openModalAdd}
            className="h-11 sm:h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm px-4"
          >
            Add Article
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          {loading ? (
            <SkeletonCard />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, i) => {
                const imageUrl = article.cover_image_url || "";

                return (
                  <div
                    key={i}
                    className="flex flex-col gap-2 p-3 sm:p-4 border rounded-lg h-full bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    {/* Image */}
                    {imageUrl ? (
                      <Image
                        width={300}
                        height={200}
                        src={imageUrl}
                        alt={article.title}
                        className="w-full h-[300px] rounded-md object-cover hover:scale-105 transition-all"
                      />
                    ) : (
                      <div className="bg-gray-200 h-[300px] rounded-md flex items-center justify-center text-sm text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-[#0c151d] text-base font-medium mt-2 line-clamp-2">
                      {article.title || "-"}
                    </h3>

                    {/* Description */}
                    <div className="text-[#4574a1] text-sm mt-1 line-clamp-2">
                      {article.description || "-"}
                    </div>

                    {/* User & Actions */}
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <div className="text-gray-500 text-xs italic">
                        {article?.user?.email || "By Unknown"}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          onClick={() =>
                            onClickEdit(article.documentId.toString())
                          }
                          className="p-0 rounded-sm bg-yellow-500 hover:bg-yellow-600"
                          size="sm"
                        >
                          <Edit3Icon size={20} />
                        </Button>
                        <Button
                          onClick={() =>
                            onClickDelete(article.documentId.toString())
                          }
                          className="p-0 rounded-sm bg-red-500 hover:bg-red-600"
                          size="sm"
                        >
                          <Trash size={20} />
                        </Button>
                      </div>
                    </div>

                    {/* Komentar Section */}
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Comments
                      </h4>

                      {/* Comment List */}
                      <div className="flex flex-col gap-2 max-h-[120px] overflow-y-auto pr-1 mb-3">
                        {article.comments.length > 0 ? (
                          article.comments.map((c: any) => (
                            <div
                              key={c.id}
                              className="bg-gray-100 rounded px-3 py-2 text-sm text-gray-700"
                            >
                              <p>{c.content}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400 italic text-sm">
                            No comments yet
                          </p>
                        )}
                      </div>

                      {/* Add Comment Form */}
                      <form
                        key={i}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!commentValue) return;

                          await comment.action({
                            article: article.id,
                            content: commentValue,
                          });
                          setCommentValue(""); // clear input
                          refetch(); // update data
                        }}
                        className="w-full flex gap-2"
                      >
                        <input
                          type="text"
                          onChange={(e) => setCommentValue(e.target.value)}
                          placeholder="Write a comment..."
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                          key={i}
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-lg"
                          disabled={comment.loading}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Loader sentinel */}
          {loading && <p className="text-center py-4">Loading more...</p>}
          <div ref={ref} />
        </div>
      </div>

      <ModalAddArticle
        closeModal={closeModalAdd}
        onSuccess={() => refetch()}
        isOpen={isOpenModalAdd}
      />
      <ModalEditArticle
        isOpen={isOpenModalEdit}
        closeModal={closeModalEdit}
        onSuccess={() => refetch()}
      />
      <ModalConfirm
        isOpen={isOpenModalDelete}
        onClose={closeModalDelete}
        onConfirm={() => onConfrimDelete()}
        title="Are you sure delete this article?"
        description="This action cannot be undone."
        loading={deleted.loading}
      />
    </>
  );
}
