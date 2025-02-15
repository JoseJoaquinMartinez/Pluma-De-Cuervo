import { ImageComponent } from "@/components/shared/ImageComponent";
import { ContactForm } from "./components/ContactForm";

export default function Contact() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center  pb-8 px-4 md:gap-10">
      <div className="flex flex-col  gap-6">
        <h2 className="text-encabezados text-2xl  text-center md:text-start font-semibold">
          Escríbeme Algo Si Quieres
        </h2>
        <ContactForm />
      </div>
      <div className=" mt-5 items-center">
        <ImageComponent
          imagen="/contact-img/contactImg.webp"
          title="Imagen del autor con un montón de peluches"
        />
      </div>
    </div>
  );
}
