"use client";

import { X } from "lucide-react";
import { FormEvent, ReactNode, useCallback } from "react";

export default function SideBar({
  children,
  title,
  setIsOpen,
  handleSubmit,
}: {
  children: ReactNode;
  title: string;
  setIsOpen: () => void;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const handleClose = useCallback((): void => {
    setIsOpen();
  }, [setIsOpen]);

  return (
    <>
      <div
        className={`pointer-events-all fixed inset-0 z-10 h-screen w-screen bg-black/80`}
      ></div>

      <div
        className={`animate-sidebar fixed top-0 right-0 z-20 h-screen max-w-lg flex-col gap-2 bg-white shadow-2xl`}
      >
        <div className="flex w-full items-center justify-between bg-blue-600 p-2 text-white">
          <span>{title}</span>
          <p
            className="cursor-pointer rounded-2xl p-0.5 hover:scale-110 hover:bg-blue-500 hover:ring"
            onClick={handleClose}
          >
            <X className="size-3 text-white" />
          </p>
        </div>
        <div className="h-full w-full px-2">
          <form onSubmit={handleSubmit}>
            {children}

            {handleSubmit !== undefined && (
              <div className="fixed bottom-0 left-0 flex w-full items-center justify-end gap-3 p-2">
                <input
                  type="reset"
                  value="Cancel"
                  className="cursor-pointer rounded-lg bg-red-400 px-2 py-1 text-white hover:bg-red-600"
                />
                <input
                  type="submit"
                  value="Confirm"
                  className="cursor-pointer rounded-lg bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
