import { Modal } from "@/components/modals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalConfirm from "@/components/modals/modal-confirm";
import useModalEditArticle from "./_use-modal-edit-category";
import { CategorySelect } from "@/components/SelectCategory";

export interface TOpenModalAdd {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess: () => void;
}

export default function ModalEditArticle(props: TOpenModalAdd) {
  const model = useModalEditArticle();
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.closeModal}
        className="max-w-[700px] m-4"
      >
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-xl dark:bg-gray-900 lg:p-11">
          <div>
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Category
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7"></p>
          </div>
          <form
            onSubmit={model.handleSubmit((data) => {
              model.onClickConfirm(data);
              props.closeModal();
            })}
          >
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label>Title Article</label>
                  <Input
                    type="text"
                    placeholder="Input category"
                    className="h-12"
                    {...model.register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                    })}
                  />
                  {model.errors.title && (
                    <p className="text-red-500 text-xs">
                      {model.errors.title?.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label>Category</label>
                  <CategorySelect
                    control={model.control}
                    {...model.register("category")}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Description Article</label>
                  <Input
                    type="text"
                    placeholder="Input description"
                    className="h-12"
                    {...model.register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 3,
                        message: "Description must be at least 3 characters",
                      },
                    })}
                  />
                  {model.errors.description && (
                    <p className="text-red-500 text-xs">
                      {model.errors.description.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label>Image URL</label>
                  <Input
                    type="text"
                    placeholder="Input image url"
                    className="h-12"
                    {...model.register("cover_image_url", {
                      required: "Image URL is required",
                      minLength: {
                        value: 3,
                        message: "Image URL must be at least 3 characters",
                      },
                    })}
                  />
                  {model.errors.cover_image_url && (
                    <p className="text-red-500 text-xs">
                      {model.errors.cover_image_url.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2 mt-6 lg:justify-end">
              <Button size="lg" variant="outline" onClick={props.closeModal}>
                Close
              </Button>
              <Button size="lg" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <ModalConfirm
        isOpen={model.isOpenConfirm}
        onClose={model.closeModal}
        title="Apakah Anda Yakin?"
        description="Aksi ini tidak dapat dibatalkan."
        onConfirm={() => {
          model.onSubmit();
          props.onSuccess();
        }}
        loading={model.loadingData}
      />
    </>
  );
}
