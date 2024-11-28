import { configureStore } from "@reduxjs/toolkit";
import blogHomepageReducer from "@/store/slices/homepage/blogs/blogHomepageSlice";
import lastTenChaptersReducer from "@/store/slices/lastTenChapters/lastTenChaptersSlice";
import libraryBooksReducer from "@/store/slices/library/libraryBooksSlice";
import singleBookReducer from "@/store/slices/singleBook/singleBookSlice";
const store = configureStore({
  reducer: {
    blogHomepage: blogHomepageReducer,
    lastTenChapters: lastTenChaptersReducer,
    libraryBooks: libraryBooksReducer,
    singleBook: singleBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
