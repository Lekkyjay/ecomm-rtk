import { useEffect } from 'react'
import Loader from '../../components/loader/Loader'
import ProductList from '../../components/productList/ProductList'
import HeaderSlider from '../../components/slider/HeaderSlider'
import { selectAllCategories } from '../../redux/categorySlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchAsyncProducts, selectAllProducts, selectAllProductsStatus } from '../../redux/productSlice'
import { IProduct } from '../../utils/interfaces'
import { STATUS } from '../../utils/status'
import './Home.scss'

export default function Home() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectAllCategories)

  useEffect(() => {
    dispatch(fetchAsyncProducts(50))
  }, [dispatch])

  const products = useAppSelector(selectAllProducts)
  const productStatus = useAppSelector(selectAllProductsStatus)

  // randomizing the products in the list
  const tempProducts: IProduct[] = []
  if(products.length > 0){
    for(let i in products){
      let randomIndex = Math.floor(Math.random() * products.length)

      while(tempProducts.includes(products[randomIndex])){
        randomIndex = Math.floor(Math.random() * products.length)
      }
      tempProducts[i] = products[randomIndex]
    }
  }

  let catProductsOne = products.filter(product => product.category === categories[0]?.slug)
  let catProductsTwo = products.filter(product => product.category === categories[1]?.slug)
  let catProductsThree = products.filter(product => product.category === categories[2]?.slug)
  let catProductsFour = products.filter(product => product.category === categories[3]?.slug)

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              { productStatus === STATUS.LOADING ? <Loader /> : <ProductList products = {tempProducts} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[0]?.name}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[1]?.name}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[2]?.name}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>

            <div className='categories-item'>
              <div className='title-md'>
                <h3>{categories[3]?.name}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
