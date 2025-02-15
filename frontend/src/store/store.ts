import { configureStore } from "@reduxjs/toolkit";
import blogHomepageReducer from "@/store/slices/homepage/blogs/blogHomepageSlice";
import lastTenChaptersReducer from "@/store/slices/lastTenChapters/lastTenChaptersSlice";
import libraryBooksReducer from "@/store/slices/library/libraryBooksSlice";
import singleBookReducer from "@/store/slices/singleBook/singleBookSlice";
import lastFiveChaptersReducer from "@/store/slices/singleBook/lastFiveChaptersSlice";
import getAllChaptersReducer from "@/store/slices/singleBook/getAllChaptersSlice";
import getSingleChapterReducer from "@/store/slices/chapter/singleChapterSlice";
import getAllBlogsReducer from "@/store/slices/blogs/allBlogsSlice";
import singleBlogReducer from "@/store/slices/blogs/singleBlogSlice";
import emailVerificationReducer from "@/store/slices/auth/singup/singupSlice";
import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    blogHomepage: blogHomepageReducer,
    lastTenChapters: lastTenChaptersReducer,
    libraryBooks: libraryBooksReducer,
    singleBook: singleBookReducer,
    lastFiveChapters: lastFiveChaptersReducer,
    getAllChaptersFromABook: getAllChaptersReducer,
    getSingleChapter: getSingleChapterReducer,
    AllBlogs: getAllBlogsReducer,
    SingleBlog: singleBlogReducer,
    EmailVerification: emailVerificationReducer,
    Authentication: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectIsLoggedIn = (state: RootState) =>
  state.Authentication.isLoggedIn;

export default store;
