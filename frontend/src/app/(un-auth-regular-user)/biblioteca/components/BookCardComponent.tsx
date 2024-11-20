'use client'
import React, {useEffect, useState} from "react";
import {BookLoaderComponent} from "@/components/shared/BookLoader";
import {getBooksData} from "@/app/(un-auth-regular-user)/biblioteca/utils/getBooksData";
import {ImageComponent} from "@/components/shared/ImageComponent";
import MainButton from "@/components/shared/mainButton";
import BookCard from "@/app/(un-auth-regular-user)/biblioteca/components/BookCard";




const BookCardComponent = () => {
    const [books, setBooks] = useState<BookCardComponentProps[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

useEffect( () => {

    const booksData = async () =>{
        setLoading(true);
       try{
           const response = await getBooksData(setError);
           if(response){
               setBooks(response);
           }
       }catch (error){
           setError(`Error cargando los libros: ${error}`);
       }finally{
           setLoading(false);
       }
    }
    booksData();
},[])


    if(loading){
        return <BookLoaderComponent/>
    }
    if(error){
        return <p>{error}</p>
    }
    return (
        <>
            {
                books.map(({id, title, Synopsis, imagen }: BookCardComponentProps) => {
                    return <BookCard key={id} id={id} title={title} Synopsis={Synopsis} imagen={imagen}/>
                })
            }
        </>
    )
}

export default BookCardComponent;