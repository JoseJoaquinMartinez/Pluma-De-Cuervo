import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleChapter } from "@/chapters/chapter/utils/getSingleChapter";
import { ChapterProps } from "@/chapters/chapter/interface/chapter";


interface getSingleChapterProps{
    bookId: number,
    chapterId: number,

}

//TODO VER COMO PASARLE LOS DOS ARGUMENTOS A THUNK
export const fetchSingleChapter = createAsyncThunk<
ChapterProps,
getSingleChapterProps, 
 {rejectValue: string}
 >
 ("fetchSingleChapter/fetchSingleChapter", async (bookId, chapterId, thunkAPI) =>{
    
    try{
        const response = await getSingleChapter(bookId, chapterId);
        return response;
    }catch(error){
        if( error instanceof Error){
            return thunkAPI.rejectWithValue(
                error.message ||"Error obteniendo el capítulo"
            )
        }
        return thunkAPI.rejectWithValue("Error desconocido")
    }
})