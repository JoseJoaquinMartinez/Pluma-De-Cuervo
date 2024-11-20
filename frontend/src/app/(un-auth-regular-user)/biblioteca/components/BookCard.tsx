import {ImageComponent} from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import React from "react";

const BookCard = ({id, title, Synopsis, imagen }:BookCardComponentProps) =>{

    return (
        <article className={"flex flex-col items-center justify-center pb-8 px-4 bg-cardsBackground rounded-lg w-1/4 h-1/4"}>

                <ImageComponent imagen={imagen} title={title}/>

            <h2 className={"my-2 text-encabezados"}>{title}</h2>
            <p className={"text-mainText text-pretty mb-10"}>{Synopsis}</p>
            <MainButton link={`/libro/${id}`} name="Leer"/>
        </article>)
}

export default BookCard;