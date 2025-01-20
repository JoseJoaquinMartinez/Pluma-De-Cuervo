"use client";
import MainButton from "@/components/shared/mainButton";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface HomeSectionComponent {
  title: string;
  content: React.ReactNode;
}

export const SectionComponentBook: React.FC<HomeSectionComponent> = ({
  title,
  content,
}) => {
  const { isLoggedIn, data: user } = useSelector(
    (state: RootState) => state.Authentication
  );
  return (
    <div className="flex flex-col justify-start max-w-screen-xl gap-6 mt-10">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <h2 className="text-encabezados text-2xl  text-center md:text-start">
          {title}
        </h2>
        {isLoggedIn && user?.user.role === "admin" ? (
          <div className="mt-2">
            <MainButton name={"Nuevo libro"} link="/admin/libros/libro/crear" />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col mlg:flex-row gap-6">{content}</div>
    </div>
  );
};
