import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChaptersFromABook } from "./thunk/fetchAllChaptersFromABook";
import type { Chapter } from '@/books/interfaces/bookData';

const initialState: {
    data: Chapter[] | null;
    loading: boolean;
    error: string | null;
} = {
    data: [],
    loading: false,
    error: null
}

const getAllChaptersSlice = createSlice({
    name: "getAllChaptersFromABook",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchAllChaptersFromABook.fulfilled, (state, action) =>{
            state.loading = false;
            state.data = action.payload
        })
        .addCase(fetchAllChaptersFromABook.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchAllChaptersFromABook.rejected, (state, action) =>{
            state.loading = false;
            state.error= action.payload as string
        })
    }
})

export default getAllChaptersSlice.reducer;