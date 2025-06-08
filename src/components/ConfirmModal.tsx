import { Card, CardContent } from "./ui/card";
import React from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  message,
  confirmText = "확인",
  cancelText = "취소",
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-xs md:max-w-sm relative rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-2xl font-bold px-2 z-10"
          onClick={onClose}
          aria-label="닫기"
        >
          &times;
        </button>
        <CardContent className="flex flex-col items-center gap-6 pt-8 pb-6 px-6">
          <div className="w-full flex flex-col items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-zinc-900 text-center">
              {message}
            </span>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button
              className="flex-1 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-medium"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              className="flex-1 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmModal;
