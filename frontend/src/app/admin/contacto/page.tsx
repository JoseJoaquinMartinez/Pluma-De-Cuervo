import { ContactComponent } from "@/contact/ContactComponent";
import { SectionComponent } from "@/homepage/components/SectionComponent";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center  w-full pb-8 px-4">
      <SectionComponent
        title="Mensajes de Contacto"
        content={<ContactComponent />}
      />
    </div>
  );
}
