import React from "react";


export const getBooksData = async (
    setError: React.Dispatch<React.SetStateAction<string>>
    )
    : Promise<BookCardComponentProps[] | undefined> => {

    try{
        const response= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-all-books`);
        if(!response.ok) {
            setError("Error cargando los libros, vuelva a intentarlo más tarde")
            return;
        }
        return await response.json();

    }catch(err){
        setError(`Error interno cargando los libros, vuelva a intentarlo más tarde ${err}`)
        return;
    }


}