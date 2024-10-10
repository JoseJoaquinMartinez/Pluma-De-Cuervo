import express from "express";
import cors from "cors";

//AUTH
import authValidationRoute from "./server/auth/validationEmail";
import authRegistrationRoute from "./server/auth/registration";
import authLoginRoute from "./server/auth/login";
import adminUserRegistrationRoute from "./server/auth/adminUserRegistration";
import adminUploadFileRoute from "./server/books/post-put/uploadFileEndpoint";
//BOOKS
import getSingleChapter from "./server/books/get/getChapter";
import getAllChaptersFromBook from "./server/books/get/getAllChapters";
import putExistingChapter from "./server/books/post-put/modifyExistingChapter";
import getAllBooks from "./server/books/get/getAllBooks";
import getSingleBook from "./server/books/get/getSingleBook";
import postNewBook from "./server/books/post-put/postNewBook";
import putExistingBook from "./server/books/post-put/putExistingBook";
import deleteBook from "./server/books/delete/deleteBook";
import deleteChapter from "./server/books/delete/deleteChapter";
// BLOGS
import postNewBlogPost from "./server/blogs/post-put/postNewBlogPost";
import putExistingBlogPost from "./server/blogs/post-put/putExistingBlogPost";
import getSingleBlogPost from "./server/blogs/get/getSingleBlogPost";
import getAllBlogPosts from "./server/blogs/get/getAllBlogPosts";
import deleteBlogPost from "./server/blogs/delete/deleteBlogPost";
//COMMENTS
import postRegularUserComment from "./server/comments/post/postCommentRegularUser";
import getCommentsByAdmin from "./server/comments/get/getCommentsByAdmin";
import postResponseCommmentByAdmin from "./server/comments/post/postCommentResponseByAdmin";

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

//DELETE
app.use("/book", deleteBook);
app.use("/book", deleteChapter);

// BLOG ROUTES

//POST
app.use("/blog", postNewBlogPost);

//PUT
app.use("/blog", putExistingBlogPost);
//GET
app.use("/blog", getSingleBlogPost);
app.use("/blog", getAllBlogPosts);
// DELETE
app.use("/blog", deleteBlogPost);

//COMMENTS ROUTES
//POST
app.use("/comment", postRegularUserComment);
app.use("/comment", postResponseCommmentByAdmin);

//GET
app.use("/comment", getCommentsByAdmin);

export default app;
