import Image from "next/image";

export const BookLoaderComponent = () => {
  return (
    <>
      <Image
        src={"/bookLoaderHD.gif"}
        alt="Cargando..."
        width={100}
        height={100}
      />
    </>
  );
};
