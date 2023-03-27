import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import ProductList from '../../components/productList/ProductList'
import { fetchAsyncProductsOfCategory, selectAllProductsByCategory, selectCategoryProductsStatus } from '../../redux/categorySlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { STATUS } from '../../utils/status'

export default function CategoryProducts() {
  const dispatch = useAppDispatch()
  const { category } = useParams()
  const categoryProducts = useAppSelector(selectAllProductsByCategory)
  const categoryProductsStatus = useAppSelector(selectCategoryProductsStatus)

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category!))
  }, [dispatch, category])

  return (
    <div className='cat-products py-5 bg-whitesmoke'>
      <div className='container'>
        <div className='cat-products-content'>
          <div className='title-md'>
            <h3>See our <span className='text-capitalize'>{category!.replace("-", " ")}</span></h3>
          </div>

          {
            categoryProductsStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {categoryProducts} />
          }
        </div>
      </div>
    </div>
  )
}
