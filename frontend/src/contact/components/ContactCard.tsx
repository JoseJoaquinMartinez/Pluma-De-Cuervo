"use client";
import MainButton from "@/components/shared/mainButton";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { postReplyToContactMessage } from "../utils/postReplyToContactMessage";
import { markContactMessageAsRead } from "../utils/markContactMessageAsRead";

const DeleteModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-cardsBackground p-4 rounded-lg shadow-lg">
      <p className="text-mainText">
        ¿Estás seguro de que deseas eliminar este mensaje?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-encabezados hover:bg-encabezados/90 text-white px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Sí
        </button>
        <button
          className="bg-botones hover:bg-botones/90 px-4 py-2 rounded"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  </div>
);

export const ContactCard = ({
  message,
  onDelete,
}: {
  message: ContactMessage;
  onDelete: (messageId: number) => void;
}) => {
  const [responding, setResponding] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [markAsRead, setMarkAsRead] = useState<boolean>(message.isRead);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.Authentication);

  const updateReadComment = async () => {
    if (token) {
      const isRead = !markAsRead;
      setMarkAsRead(isRead);
      try {
        const id = message.id;

        await markContactMessageAsRead({ id, token, isRead });
        router.refresh();
      } catch (error) {
        setMarkAsRead(!isRead);
      }
    }
  };

  const handleOpenResponseBox = () => {
    setResponding(!responding);
  };

  const handleResponse = async () => {
    if (token) {
      try {
        await postReplyToContactMessage({
          email: message.email,
          replyMessage: replyMessage,
          token,
        });
        setReplyMessage("");
        setResponding(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value);
  };

  return (
    <article className="flex flex-col justify-center my-2 rounded-lg p-2 w-full mlg:max-w-screen-xl md:max-w-screen-md">
      <section
        className={`flex flex-col my-2 rounded-lg p-2 text-mainText bg-cardsBackground ${
          markAsRead ? "opacity-60" : ""
        }`}
      >
        <header className="flex flex-row items-center justify-between gap-3 text-encabezados font-semibold my-2">
          <h3 className="text-sm">{message.email}</h3>
        </header>
        <p className="rounded-lg min-h-20">{message.message}</p>
        <footer className="self-end text-xs py-2">
          <p className="text-mainText font-semibold">{message.createdAt}</p>
          <p
            className="cursor-pointer hover:text-encabezados"
            onClick={updateReadComment}
          >
            {markAsRead ? "Marcar como no leído" : "Marcar como leído"}
          </p>
          <div className="p-2">
            <MainButton
              name="Eliminar"
              onClick={() => {
                setOpenDeleteModal(true);
              }}
            />
          </div>
        </footer>
        {responding && (
          <section className="flex flex-col items-center gap-2 transition-all w-full rounded-lg justify-center mlg:max-w-screen-xl md:max-w-screen-md bg-cardsBackground">
            <textarea
              className="h-44 border border-encabezados/50 text-mainText md:text-xl rounded-md focus:outline-none p-2 focus:ring-2 w-full focus:ring-encabezados"
              placeholder="Responde al comentario"
              value={replyMessage}
              onChange={handleInputChange}
            />
            <MainButton name="Enviar Comentario" onClick={handleResponse} />
          </section>
        )}
      </section>

      <section className="flex flex-col md:flex-row justify-center items-center gap-2">
        <MainButton
          name={!responding ? "Responder" : "No responder"}
          onClick={handleOpenResponseBox}
        />
      </section>

      {openDeleteModal && (
        <DeleteModal
          onConfirm={() => {
            onDelete(message.id);
            setOpenDeleteModal(false);
          }}
          onCancel={() => setOpenDeleteModal(false)}
        />
      )}
    </article>
  );
};
