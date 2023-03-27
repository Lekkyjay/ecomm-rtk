import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import ProductList from '../../components/productList/ProductList'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { clearSearch, fetchAsyncSearchProduct, selectSearchProducts, selectSearchProductsStatus } from '../../redux/searchSlice'
import { STATUS } from '../../utils/status'
import './Search.scss'

export default function Search() {
  const dispatch = useAppDispatch()
  const {searchTerm } = useParams()
  const searchProducts = useAppSelector(selectSearchProducts)
  const searchProductsStatus = useAppSelector(selectSearchProductsStatus)

  useEffect(() => {
    dispatch(clearSearch())
    dispatch(fetchAsyncSearchProduct(searchTerm!))
  }, [searchTerm])

  if(searchProducts.length === 0){
    return (
      <div className='container' style = {{
        minHeight: "70vh"
      }}>
        <div className='fw-5 text-danger py-5'>
          <h3>No Products found.</h3>
        </div>
      </div>
    )
  }

  return (
    <main>
      <div className='search-content bg-whitesmoke'>
        <div className='container'>
          <div className='py-5'>
            <div className='title-md'>
              <h3>Search results:</h3>
            </div>
            <br />
            {
              searchProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {searchProducts} />
            }
          </div>
        </div>
      </div>
    </main>
  )
}
