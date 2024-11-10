import { SectionComponent } from "@/homepage/components/SectionComponent";
import { ImageComponent } from "@/components/shared/ImageComponent";
import { ContactForm } from "./components/ContactForm";

export default function Contact() {
  return (
    <div className="flex flex-col mlg:flex-row items-center justify-center px-4">
      <SectionComponent
        title="Escríbeme Algo Si Quieres"
        content={<ContactForm />}
      />
      <div className="mlg:ml-96 mt-5 items-center">
        <ImageComponent
          imagen="/contact-img/contactImg.webp"
          title="Imagen del autor con un montón de peluches"
        />
      </div>
    </div>
  );
}
