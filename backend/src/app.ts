import express from "express";
import cors from "cors";

//AUTH
import authValidationRoute from "./server/auth/validationEmail";
import authRegistrationRoute from "./server/auth/registration";
import authLoginRoute from "./server/auth/login";
import adminUserRegistrationRoute from "./server/auth/adminUserRegistration";
import adminUploadFileRoute from "./server/books/post-put/uploadFileEndpoint";
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
import getLastFiveChapters from "./server/books/get/getLastFiveChapters";

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

//NEWSLETTER
import postNewSubscriber from "./server/newsletter/post/postNewSubscriber";
import sendEmailToSubscribers from "./server/newsletter/post/postSendEmailsToSubs";
import deleteSubscriber from "./server/newsletter/delete/deleteSubscriber";

//CONTACT FORM
import postNewContactMessage from "./server/contact-form/post/postNewContactMessage";
import getUnreadMessages from "./server/contact-form/get/getUnreadMessages";
import putSetMessageToRead from "./server/contact-form/put/putMessageAsRead";

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
app.use("/book", putExistingBook);
app.use("/book", putExistingChapter);

//GET
app.use("/book", getAllBooks);
app.use("/book", getSingleBook);

app.use("/book", getSingleChapter);
app.use("/book", getAllChaptersFromBook);
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

//GET
app.use("/comment", getCommentsByAdmin);
app.use("/comment", getCommentsByRegularUser);

//NEWSLETTER ROUTES

//POST
app.use("/newsletter", postNewSubscriber);
app.use("/newsletter", sendEmailToSubscribers);

//DELETE
app.use("/newsletter", deleteSubscriber);

//CONTACT FORM ROUTES

//POST
app.use("/contact", postNewContactMessage);

//GET
app.use("/contact", getUnreadMessages);

//PUT
app.use("/contact", putSetMessageToRead);

export default app;
