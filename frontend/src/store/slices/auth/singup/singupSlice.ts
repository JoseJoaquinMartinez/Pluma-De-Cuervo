import {createSlice} from "@reduxjs/toolkit";
import {fetchEmailVerification} from "@/store/slices/auth/singup/thunk/fetchEmailVerification";
import type {EmailVerificationResponse} from "@/store/slices/auth/singup/thunk/fetchEmailVerification";

const initialState: {
    data: EmailVerificationResponse | null,
    loading: boolean,
    error: string | null,
} = {
    data: null,
    loading: false,
    error: null,
}

const emailVerificationSlice = createSlice({
    name: "emailVerification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmailVerification.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchEmailVerification.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEmailVerification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default  emailVerificationSlice.reducer;