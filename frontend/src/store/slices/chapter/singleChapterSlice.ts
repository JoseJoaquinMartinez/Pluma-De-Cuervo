import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleChapter } from "./thunks/fetchSingleChapter";
import type { ChapterProps } from "@/chapters/chapter/interface/chapter";

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
        .addCase(fetch)
    }
})