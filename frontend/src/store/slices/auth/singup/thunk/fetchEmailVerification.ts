import { createAsyncThunk } from "@reduxjs/toolkit";
import { emailVerification } from "@/app/authComponents/utils/emailVerification";


interface EmailVerificationProps {
    email: string;
    password: string;
}

export interface EmailVerificationResponse {
    message: string;
}

export const fetchEmailVerification = createAsyncThunk<
    EmailVerificationResponse,
    EmailVerificationProps,
    { rejectValue: string }
>(
    "fetchEmailVerification/fetchEmailVerification",
    async ({ email, password }: EmailVerificationProps, thunkAPI) => {
        try {
            const response = await emailVerification({ email, password });

            if (!response) {
                return thunkAPI.rejectWithValue("Error verificando el email");
            }
            return response;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message || "Error verificando el email");
            }
            return thunkAPI.rejectWithValue("Error desconocido");
        }
    }
);
