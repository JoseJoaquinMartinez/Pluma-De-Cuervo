import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllBlogs } from "@/blogs/utils/getAllBlogs";
import type { Blogs } from "@/blogs/interface/blogs";

export const fetchAllBlogs = createAsyncThunk<
  Blogs,
  void,
  { rejectValue: string }
>("fetchAllBlogs/fetchAllBlogs", async (_, thunkAPI) => {
  try {
    const response = await getAllBlogs();

    if (response.length === 0) {
      return [];
    }
    if (!response) {
      throw new Error("Blogs no encontrados");
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo los blogs"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
