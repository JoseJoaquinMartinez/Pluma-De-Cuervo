import express from "express";
import cors from "cors";

import authValidationRoute from "./server/auth/validationEmail";
import authRegistrationRoute from "./server/auth/registration";
import authLoginRoute from "./server/auth/login";
import adminUserRegistrationRoute from "./server/auth/adminUserRegistration";
import adminUploadFileRoute from "./server/books/post-put/uploadFileEndpoint";
import getSingleChapter from "./server/books/get/getChapter";
import getAllChaptersFromBook from "./server/books/get/getAllChapters";

const app = express();

app.use(express.json());

app.use(cors());

// auth routes
app.use("/auth", authValidationRoute);
app.use("/auth", authRegistrationRoute);
app.use("/auth", authLoginRoute);
app.use("/auth", adminUserRegistrationRoute);

//book routes
app.use("/book", adminUploadFileRoute);
app.use("/book", getSingleChapter);
app.use("/book", getAllChaptersFromBook);

export default app;
