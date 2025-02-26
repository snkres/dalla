import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000]/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFDFA] rounded-lg w-full max-w-[43rem] p-6 shadow-lg !h-[80dvh] overflow-y-scroll">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}