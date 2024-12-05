import { configureStore } from "@reduxjs/toolkit";
import blogHomepageReducer from "@/store/slices/homepage/blogs/blogHomepageSlice";
import lastTenChaptersReducer from "@/store/slices/lastTenChapters/lastTenChaptersSlice";
import libraryBooksReducer from "@/store/slices/library/libraryBooksSlice";
import singleBookReducer from "@/store/slices/singleBook/singleBookSlice";
import lastFiveChaptersReducer from "@/store/slices/singleBook/lastFiveChaptersSlice";
import getAllChaptersReducer from '@/store/slices/singleBook/getAllChaptersSlice';

const store = configureStore({
  reducer: {
    blogHomepage: blogHomepageReducer,
    lastTenChapters: lastTenChaptersReducer,
    libraryBooks: libraryBooksReducer,
    singleBook: singleBookReducer,
    lastFiveChapters: lastFiveChaptersReducer,
    getAllChaptersFromABook: getAllChaptersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
