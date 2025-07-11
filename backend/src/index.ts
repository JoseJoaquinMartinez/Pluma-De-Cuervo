import express from "express";
import cors from "cors";
import "./utils/cronUserCleaning";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "https://pluma-de-cuervo.vercel.app",
    "https://pluma-de-cuervo-h5js.vercel.app",
    "https://pluma-de-cuervo-production.up.railway.app",
    "https://www.plumadecuervo.com",
    "http://localhost:3001",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//User
import changeUserName from "./server/user/userUpdateName";

//AUTH
import authValidationRoute from "./server/auth/validationEmail";
import authRegistrationRoute from "./server/auth/registration";
import authLoginRoute from "./server/auth/login";
import adminUserRegistrationRoute from "./server/auth/adminUserRegistration";
import adminUploadFileRoute from "./server/books/post-put/uploadFileEndpoint";
import clearCookie from "./server/auth/logout";
//BOOKS
import getAllBooks from "./server/books/get/getAllBooks";
import getSingleBook from "./server/books/get/getSingleBook";
import postNewBook from "./server/books/post-put/postNewBook";
import putExistingBook from "./server/books/post-put/putExistingBook";
import deleteBook from "./server/books/delete/deleteBook";

//CHAPTERS
import getSingleChapter from "./server/books/get/getChapter";
import getAllChaptersFromBook from "./server/books/get/getAllChapters";
import putExistingChapter from "./server/books/post-put/modifyExistingChapter";
import deleteChapter from "./server/books/delete/deleteChapter";
import getLastTenChapters from "./server/books/get/getLastTenChapters";
import getLastFiveChapters from "./server/books/get/getLastFiveChaptersFromABook";
import nextChapter from "./server/chapters/get/nextChapter";
import previousChapter from "./server/chapters/get/previousChapter";

// BLOGS
import postNewBlogPost from "./server/blogs/post-put/postNewBlogPost";
import putExistingBlogPost from "./server/blogs/post-put/putExistingBlogPost";
import getSingleBlogPost from "./server/blogs/get/getSingleBlogPost";
import getAllBlogPosts from "./server/blogs/get/getAllBlogPosts";
import deleteBlogPost from "./server/blogs/delete/deleteBlogPost";
import getLastFiveBlogs from "./server/blogs/get/getLastFiveBlogs";
//COMMENTS
import postRegularUserComment from "./server/comments/post/postCommentRegularUser";
import getCommentsByAdmin from "./server/comments/get/getCommentsByAdmin";
import postResponseCommmentByAdmin from "./server/comments/post/postCommentResponseByAdmin";
import getCommentsByRegularUser from "./server/comments/get/getCommetsByRegularUser";
import postResponseToAdminByRegularUser from "./server/comments/post/postReplyToAdminByRegularUser";
import getUserCommentForAChapter from "./server/comments/get/getUserCommentsOnAChapter";
import deleteCommentFromUser from "./server/comments/delete/deleteUserComment";
import markCommentAsRead from "./server/comments/patch/patchCommentAsRead";

//NEWSLETTER
import postNewSubscriber from "./server/newsletter/post/postNewSubscriber";
import sendEmailToSubscribers from "./server/newsletter/post/postSendEmailsToSubs";
import deleteSubscriber from "./server/newsletter/delete/deleteSubscriber";

//CONTACT FORM
import postNewContactMessage from "./server/contact-form/post/postNewContactMessage";
import getUnreadMessages from "./server/contact-form/get/getUnreadMessages";
import putSetMessageToRead from "./server/contact-form/put/putMessageAsRead";
import replyToContactMessage from "./server/contact-form/post/sendReplyToMessage";
import markContactMessageAsRead from "./server/contact-form/patch/markContactMessageAsRead";
import deleteContactMessage from "./server/contact-form/delete/deleteContactMessage";

//OTHER WORKS
import getOtherWorks from "./server/other-works/get/getOtherWorks";
import postOtherWork from "./server/other-works/post/postOtherWork";
import putOtherWork from "./server/other-works/put/putOtherWork";
import deleteOtherWork from "./server/other-works/delete/delete-other-work";
import getOtherWorkById from "./server/other-works/get/getOtherWorkById";

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Añadimos más logs para debug
  console.log("Environment variables:");
  console.log("PORT:", process.env.PORT);
  console.log("NODE_ENV:", process.env.NODE_ENV);
});

/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor local en http://localhost:${PORT}`);
}); */

//USER
app.use("/user", changeUserName);

// AUTH ROUTES

app.use("/auth", authValidationRoute);
app.use("/auth", authRegistrationRoute);
app.use("/auth", authLoginRoute);
app.use("/auth", adminUserRegistrationRoute);
app.use("/auth", clearCookie);

//BOOK ROUTES

//POST
app.use("/book", adminUploadFileRoute);
app.use("/book", postNewBook);

//PUT
app.use("/book", putExistingBook);
app.use("/book", putExistingChapter);

//GET
app.use("/book", getAllBooks);
app.use("/book", getSingleBook);
app.use("/book", nextChapter);
app.use("/book", previousChapter);

app.use("/book", getSingleChapter);
app.use("/book", getAllChaptersFromBook);
app.use("/book", getLastTenChapters);
app.use("/book", getLastFiveChapters);

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
app.use("/blog", getLastFiveBlogs);
// DELETE
app.use("/blog", deleteBlogPost);

//COMMENTS ROUTES
//POST
app.use("/comment", postRegularUserComment);
app.use("/comment", postResponseCommmentByAdmin);
app.use("/comment", postResponseToAdminByRegularUser);

//PATCH
app.use("/comment", markCommentAsRead);

//GET
app.use("/comment", getCommentsByAdmin);
app.use("/comment", getCommentsByRegularUser);
app.use("/comment", getUserCommentForAChapter);

//DELETE
app.use("/comment", deleteCommentFromUser);

//NEWSLETTER ROUTES

//POST
app.use("/newsletter", postNewSubscriber);
app.use("/newsletter", sendEmailToSubscribers);

//DELETE
app.use("/newsletter", deleteSubscriber);

//CONTACT FORM ROUTES

//POST
app.use("/contact", postNewContactMessage);
app.use("/contact", replyToContactMessage);
//GET
app.use("/contact", getUnreadMessages);

//PUT
app.use("/contact", putSetMessageToRead);

//PATCH
app.use("/contact", markContactMessageAsRead);

//DELETE
app.use("/contact", deleteContactMessage);

//OTHER WORKS
app.use("/other-works", getOtherWorks);
app.use("/other-works", postOtherWork);
app.use("/other-works", putOtherWork);
app.use("/other-works", deleteOtherWork);
app.use("/other-works", getOtherWorkById);

export default app;
