import {createSlice} from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState = {
  isSidebarOn: false
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarOn: (state) => {
      state.isSidebarOn = true
    },

    setSidebarOff: (state) => {
      state.isSidebarOn = false
    }
  }
})

export const {setSidebarOn, setSidebarOff} = sidebarSlice.actions
export const selectSidebarStatus = (state: RootState) => state.sidebar.isSidebarOn
export default sidebarSlice.reducer