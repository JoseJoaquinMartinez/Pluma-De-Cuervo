"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ErrorToast from "./ErrorToaster";

import { fetchUpdateUserName } from "@/store/slices/auth/singup/thunk/fetchUpdateUserName";

export default function ChangeUserNameModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [newUserName, setNewUserName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, token, loading } =
    useSelector((state: RootState) => state.Authentication) || {};

  const patchChangeUserName = async () => {
    if (!newUserName.trim() || !data?.user?.id) return;
    try {
      if (token) {
        const response = dispatch(
          fetchUpdateUserName({
            token,
            userName: newUserName,
            id: data.user.id,
          })
        );
        setNewUserName("");
      }
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        return <ErrorToast message={error.message} />;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-30  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-cardsBackground p-6 rounded-lg  ">
        <h2 className="text-lg font-semibold text-encabezados mb-4">
          ¿Quieres cambiar el nombre de usuario?
        </h2>
        <input
          type="text"
          className="border w-full border-encabezados/50 text-mainText md:text-xl  rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-encabezados"
          placeholder="Nuevo nombre de usuario"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <div className="flex  justify-center mt-4 space-x-2">
          <button
            onClick={patchChangeUserName}
            disabled={loading}
            className={`px-4 py-2 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-botones"} text-white rounded-md`}
          >
            {loading ? "Cambiando..." : "Cambiar"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-botonesSecundarios text-white rounded-md hover:bg-bordesDecor"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
