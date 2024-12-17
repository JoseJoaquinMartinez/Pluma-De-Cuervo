import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SingleBlog } from "@/blogs/interface/blogs";
import { getSingleBlog } from "@/blogs/utils/getSingleBlog";

export const fetchSingleBlog = createAsyncThunk<
  SingleBlog,
  number,
  { rejectValue: string }
>("fetchSingleBlog/fetchSingleBlog", async (id, thunkAPI) => {
  try {
    const response = await getSingleBlog(id);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error obteniendo el blog"
      );
    }
    return thunkAPI.rejectWithValue("Error desconocido");
  }
});
