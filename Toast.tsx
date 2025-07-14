import React, { useEffect, useRef } from 'react';

interface ToastProps {
  open: boolean;
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ open, message, type = 'success', onClose }) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      timer.current = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [open, onClose]);

  const handleMouseEnter = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  const handleMouseLeave = () => {
    if (open) {
      timer.current = setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  if (!open) return null;
  return (
    <div
      ref={toastRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl border text-white transition-all duration-300 ${
        type === 'success'
          ? 'bg-emerald-600 border-emerald-700'
          : 'bg-red-600 border-red-700'
      }`}
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default Toast; 