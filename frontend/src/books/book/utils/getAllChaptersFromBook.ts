import { BookProps, Chapter } from "@/books/interfaces/bookData";

export const getAllChaptersFromABook = async (bookId: number): Promise<Chapter[]> =>{
    try{
        
        const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/book/get-all-chapters/${bookId}`)
        const allChapters: BookProps[] = await response.json(); 
        const chaptersArray: Chapter[] = allChapters.chapter;

        const formatedChapters = chaptersArray.map((chapter) =>({
            ...chapter,
            createdAt: new Date (chapter.createdAt).toLocaleString("es-ES",{
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })
        }))
        return formatedChapters; 
        
    }catch (error){
        console.error(error);
        return [];
        
    }
};