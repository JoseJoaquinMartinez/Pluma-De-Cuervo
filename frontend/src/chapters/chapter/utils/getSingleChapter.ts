import { ChapterProps } from "../interface/chapter";


export const getSingleChapter = async (chapterId:number, bookId: number): Promise<ChapterProps|undefined> => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}+/book/get-chapter/${bookId}/${chapterId}`)
        const chapterData = await response.json();
        console.log(chapterData);
        return chapterData;
    }catch(error){
        if(error instanceof Error){
            console.error(`Error obteniendo la información del capítulos ${error.message}`)
            return ;
        }
        console.error("Error inesperado cargando el capitulo")
    }
}