import {configureStore} from "@reduxjs/toolkit";
import tutorialEditorReducer from "./reducers/tutorialEditorSlice"
import tutorialManagerReducer from "./reducers/tutorialManagerSlice";

export const store = configureStore({
    reducer: {
        tutorialEditor: tutorialEditorReducer,
        tutorialManager: tutorialManagerReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch