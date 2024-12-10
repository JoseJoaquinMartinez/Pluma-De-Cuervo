import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleChapter } from "./thunks/fetchSingleChapter";
import type { ChapterProps } from "@/chapters/chapter/interface/chapter";
import { stat } from "fs";

const initialState: {
    data: ChapterProps | null;
    loading: boolean;
    error: string | null;
} = {
    data: null,
    loading: false,
    error: null,
}

const getSingleChapterSlice = createSlice({
    name: "getSingleChapter",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchSingleChapter.fulfilled, (state, action) =>{
            state.loading = false;
            state.data = action.payload
        })
        .addCase(fetchSingleChapter.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchSingleChapter.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})