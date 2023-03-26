import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import sidebarReducer from "./sidebarSlice"

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer
  }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>