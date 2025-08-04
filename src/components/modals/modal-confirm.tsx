import { CheckCircleIcon } from "lucide-react";
import { ReactNode } from "react";
import { Modal } from ".";
import { Button } from "../ui/button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  loading?: boolean;
}

export default function ModalConfirm({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Aksi",
  description = "Apakah Anda yakin ingin melanjutkan tindakan ini?",
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  icon = <CheckCircleIcon className="w-6 h-6 text-yellow-500" />,
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6 bg-white rounded-xl dark:bg-gray-800">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button size="lg" onClick={onConfirm} disabled={loading}>
            {loading ? "load..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
