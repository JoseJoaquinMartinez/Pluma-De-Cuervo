import express from "express";
import cors from "cors";

import authValidationRoute from "./server/auth/validationEmail";
import authRegistrationRoute from "./server/auth/registration";

const app = express();

app.use(express.json());

app.use(cors());

app.use(`/auth`, authValidationRoute);
app.use("/auth", authRegistrationRoute);

export default app;