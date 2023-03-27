import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../utils/apiURL"
import { IProduct } from "../utils/interfaces"
import { STATUS } from "../utils/status"
import { RootState } from "./store"

interface IState {
  searchProducts: IProduct[]
  searchProductsStatus: string
}

const initialState: IState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchProducts = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncSearchProduct.pending, (state, action) => {
        state.searchProductsStatus = STATUS.LOADING
      })

      .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
        state.searchProducts = action.payload
        state.searchProductsStatus = STATUS.SUCCEEDED
      })

      .addCase(fetchAsyncSearchProduct.rejected, (state, action) => {
        state.searchProductsStatus = STATUS.FAILED
      })
  }
})

export const fetchAsyncSearchProduct = createAsyncThunk('product-search/fetch', async(searchTerm: string) => {
  const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`)
  const data = await response.json()
  return data.products
})

export const { clearSearch } = searchSlice.actions
export const selectSearchProducts = (state: RootState) => state.search.searchProducts
export const selectSearchProductsStatus = (state: RootState) => state.search.searchProductsStatus
export default searchSlice.reducer