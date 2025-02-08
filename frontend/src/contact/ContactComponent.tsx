"use client";
import React, { useEffect, useState } from "react";
import { ContactCard } from "./components/ContactCard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { getContactMessages } from "./utils/getContactMessages";
import { deleteContactMessage } from "./utils/deleteMessage";

export const ContactComponent = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const { token } = useSelector((state: RootState) => state.Authentication);
  const router = useRouter();

  const fetchComments = async () => {
    if (!token) return;
    try {
      const fetchedMessages = await getContactMessages(token);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleDeleteComment = async (messageId: number) => {
    if (token) {
      try {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageId)
        );

        await deleteContactMessage({ messageId, token });
        router.refresh();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, [token]);

  const filteredMessages = messages.filter((message) => {
    if (filter === "all") return true;
    if (filter === "read") return message.isRead;
    if (filter === "unread") return !message.isRead;
  });

  return (
    <div className="w-full">
      <section className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-botones text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "read"
              ? "bg-botonesSecundarios text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setFilter("read")}
        >
          Leídos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "unread"
              ? "bg-encabezados text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => setFilter("unread")}
        >
          No Leídos
        </button>
      </section>
      {filteredMessages.length > 0 ? (
        filteredMessages.map((message) => (
          <ContactCard
            key={message.id}
            message={message}
            onDelete={handleDeleteComment}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">
          No hay comentarios que mostrar
        </div>
      )}
    </div>
  );
};
