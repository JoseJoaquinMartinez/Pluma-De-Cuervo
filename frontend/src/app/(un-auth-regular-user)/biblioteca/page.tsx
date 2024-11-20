import {SectionComponent} from "@/homepage/components/SectionComponent";
import BookCardComponent from "@/app/(un-auth-regular-user)/biblioteca/components/BookCardComponent";

export default function Biblioteca() {


  return <div className="flex flex-col items-center justify-center pb-8 px-4">
    <SectionComponent title="Biblioteca" content={<BookCardComponent/>}/>
  </div>
}
