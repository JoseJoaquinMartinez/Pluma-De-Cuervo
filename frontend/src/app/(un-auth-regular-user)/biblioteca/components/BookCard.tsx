import {ImageComponent} from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import React from "react";

const BookCard = ({id, title, Synopsis, imagen }:BookCardComponentProps) =>{

    return (
        <article className={"flex flex-col items-center justify-center px-4  rounded-lg "}>

               <div className={"mb-3"}>
                   <ImageComponent imagen={imagen} title={title}/>
               </div>
                <div className="flex flex-col items-center justify-center pb-8 px-4  rounded-lg bg-cardsBackground">
                    <h2 className={"my-2 text-encabezados text-xl md:text-2xl"}>{title}</h2>
                    <p className={"text-mainText text-pretty mb-10"}>{Synopsis}</p>
                    <MainButton link={`/libro/${id}`} name="Leer"/>
                </div>
        </article>)
}

export default BookCard;