import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {BASE_URL} from '../utils/apiURL'
import {STATUS} from '../utils/status'
import { RootState } from './store'
import { ICategory } from '../utils/interfaces'

interface IState {
  categories: ICategory[]
  categoriesStatus: string
  categoryProducts: [],
  categoryProductsStatus: string
}

const initialState: IState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state, action) => {
        state.categoriesStatus = STATUS.LOADING
      })

      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.categoriesStatus = STATUS.SUCCEEDED
      })

      .addCase(fetchAsyncCategories.rejected, (state, action) => {
        state.categoriesStatus = STATUS.FAILED
      })

      .addCase(fetchAsyncProductsOfCategory.pending, (state, action) => {
        state.categoryProductsStatus = STATUS.LOADING
      })

      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload
        state.categoryProductsStatus = STATUS.SUCCEEDED
      })

      .addCase(fetchAsyncProductsOfCategory.rejected, (state, action) => {
        state.categoryProductsStatus = STATUS.FAILED
      })
  }
})

export const fetchAsyncCategories = createAsyncThunk('categories/fetch', async() => {
  const response = await fetch(`${BASE_URL}products/categories`)
  const data = await response.json()
  return data
})

export const fetchAsyncProductsOfCategory = createAsyncThunk('category-products/fetch', async(category: string) => {
  const response = await fetch(`${BASE_URL}products/category/${category}`)
  const data = await response.json()
  return data.products
})

export const selectAllCategories = (state: RootState) => state.category.categories
export const selectAllProductsByCategory = (state: RootState) => state.category.categoryProducts
export const selectCategoryProductsStatus = (state: RootState) => state.category.categoryProductsStatus
export default categorySlice.reducer