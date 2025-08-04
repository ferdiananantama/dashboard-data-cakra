import { Modal } from "@/components/modals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ModalConfirm from "@/components/modals/modal-confirm";
import useModalEditCategory from "./_use-modal-edit-category";

export interface TOpenModalAdd {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess: () => void;
}

export default function ModalEditCategory(props: TOpenModalAdd) {
  const model = useModalEditCategory();
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
                  <label>Category Name</label>
                  <Input
                    type="text"
                    placeholder="Input category"
                    className="h-12"
                    {...model.register("name", {
                      required: "This field is required",
                      maxLength: {
                        value: 100,
                        message: "Max length is 100",
                      },
                    })}
                  />
                  {model.errors.name && (
                    <p className="text-red-500 text-xs">
                      {model.errors.name?.message}
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
