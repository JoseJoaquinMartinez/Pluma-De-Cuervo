"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { BookLoaderComponent } from "@/components/shared/BookLoader";
import { fetchLibraryBooks } from "@/store/slices/library/thunks/fecthLibraryBooks";
import { useEffect } from "react";
import Slider from "@/books/components/Slider";
import CardDisplay from "@/books/components/cardDisplay";
import MainButton from "@/components/shared/mainButton";

const BookCardComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: books,
    loading,
    error,
  } = useSelector((state: RootState) => state.libraryBooks);
  const { isLoggedIn, data: user } = useSelector(
    (state: RootState) => state.Authentication
  );
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchLibraryBooks());
    }
  }, [dispatch, books]);

  if (loading) {
    return <BookLoaderComponent />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      {isLoggedIn && user?.user.role === "admin" ? (
        <div>
          <MainButton name={"Nuevo libro"} link="/admin/libros/libro/crear" />
        </div>
      ) : (
        <></>
      )}
      <div className="hidden mlg:flex mlg:flex-row items-center gap-5 mt-2">
        <CardDisplay books={books} />
      </div>
      <div className="w-full mlg:hidden">
        <Slider books={books} />
      </div>
    </>
  );
};

export default BookCardComponent;
