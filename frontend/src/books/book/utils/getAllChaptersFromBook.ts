import { Chapter } from "@/books/interfaces/bookData";

export const getAllChaptersFromABook = async (bookId: number): Promise<Chapter[]> =>{
    try{
        const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-chapters/${bookId}`)
        const allChapters: Chapter[] = await response.json();
        return allChapters.map((chapter) =>({
            ...chapter,
            createdAt: new Date (chapter.createdAt).toLocaleString("es-ES",{
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            })
        }))
    }catch (error){
        console.error(error)
        return [];
    }
};