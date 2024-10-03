import express from "express";
import cors from "cors";

import authValidationRoute from "./server/auth/validationEmail";
import authRegistrationRoute from "./server/auth/registration";
import authLoginRoute from "./server/auth/login";
import adminUserRegistrationRoute from "./server/auth/adminUserRegistration";
import adminUploadFileRoute from "./server/books/post-put/uploadFileEndpoint";
import getSingleChapter from "./server/books/get/getChapter";
import getAllChaptersFromBook from "./server/books/get/getAllChapters";
import putExistingChapter from "./server/books/post-put/modifyExistingChapter";
import getAllBooks from "./server/books/get/getAllBooks";
import getSingleBook from "./server/books/get/getSingleBook";
import postNewBook from "./server/books/post-put/postNewBook";
import putExistingBook from "./server/books/post-put/putExistingBook";
import postNewBlogPost from "./server/blogs/post-put/postNewBlogPost";

const app = express();

app.use(express.json());

app.use(cors());

// AUTH ROUTES

app.use("/auth", authValidationRoute);
app.use("/auth", authRegistrationRoute);
app.use("/auth", authLoginRoute);
app.use("/auth", adminUserRegistrationRoute);

//BOOK ROUTES

//POST
app.use("/book", adminUploadFileRoute);
app.use("/book", postNewBook);

//PUT
app.use("/book", putExistingChapter);
app.use("/book", putExistingBook);

//GET
app.use("/book", getSingleChapter);
app.use("/book", getAllChaptersFromBook);
app.use("/book", getAllBooks);
app.use("/book", getSingleBook);

// BLOG ROUNTES

//POST
app.use("/blog", postNewBlogPost);

export default app;
