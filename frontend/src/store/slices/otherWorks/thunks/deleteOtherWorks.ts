import { createAsyncThunk } from "@reduxjs/toolkit";

interface DeleteOtherWorkResponse {
  id: number;
  message: string;
}

const onDeleteOtherWork = async (
  id: number
): Promise<DeleteOtherWorkResponse | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/other-works/delete-other-work/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error deleting other work: ${error}`);
    return undefined;
  }
};

export const deleteOtherWork = createAsyncThunk<
  DeleteOtherWorkResponse,
  number,
  { rejectValue: string }
>("otherWorks/deleteOtherWork", async (id, thunkAPI) => {
  try {
    const deletedId = await onDeleteOtherWork(id);
    if (!deletedId) {
      return thunkAPI.rejectWithValue("Error deleting other work");
    }
    return deletedId;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(
        error.message || "Error deleting other work"
      );
    }
    return thunkAPI.rejectWithValue("Unknown error occurred");
  }
});
