import { configureStore } from "@reduxjs/toolkit";
import blogHomepageReducer from "@/store/slices/homepage/blogs/blogHomepageSlice";

const store = configureStore({
  reducer: {
    blogHomepage: blogHomepageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
