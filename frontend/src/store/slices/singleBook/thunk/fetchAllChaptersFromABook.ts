import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllChaptersFromABook } from '../../../../books/book/utils/getAllChaptersFromBook';
import type { Chapter } from "@/books/interfaces/bookData";

export const fetchAllChaptersFromABook = createAsyncThunk<
Chapter[],
number,
{rejectValue: string}>("fetchAllChaptersFromABook/fetchAllChaptersFromABook", 
    async(id, thunkAPI) =>{
        try{
            return await getAllChaptersFromABook(id)
        }catch(error){
            if( error instanceof Error){
                return thunkAPI.rejectWithValue(
                    error.message ||"Error obteniendo los capítulos del libro"
                )
            }
            return thunkAPI.rejectWithValue("Error desconocido")
        }
    }
)
