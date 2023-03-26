import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/apiURL'
import { IProduct } from '../utils/interfaces'
import { STATUS } from '../utils/status'
import { RootState } from './store'

interface IState {
  products: IProduct[],
  productsStatus: string,
  productSingle: IProduct,
  productSingleStatus: string
}

const initialState: IState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: {} as IProduct,
  productSingleStatus: STATUS.IDLE
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING
      })

      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.productsStatus = STATUS.SUCCEEDED
      })
      
      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAILED
      })

      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING
      })

      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload
        state.productSingleStatus = STATUS.SUCCEEDED
      })

      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED
      })
  }
})

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk('products/fetch', async(limit: number) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`)
    const data = await response.json()
    return data.products
})

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk('product-single/fetch', async(id: string) => {
    const response = await fetch(`${BASE_URL}products/${id}`)
    const data = await response.json()
    return data
})


export const selectAllProducts = (state: RootState) => state.product.products
export const selectAllProductsStatus = (state: RootState) => state.product.productsStatus
export const selectProductSingle = (state: RootState) => state.product.productSingle
export const selectSingleProductStatus = (state: RootState) => state.product.productSingleStatus
export default productSlice.reducer