import React from 'react'
import { IProduct } from '../../utils/interfaces'
import Product from '../product/Product'
import './ProductList.scss'

interface IProps {
  products: IProduct[]
}

export default function ProductList({ products }: IProps) {
  return (
    <div className='product-lists grid bg-whitesmoke my-3'>
      {
        products.map(product => {
          let discountedPrice = (product.price) - (product.price * (product.discountPercentage / 100));

          return (
            <Product key = {product.id} product = {product} discountedPrice = { discountedPrice } />
          )
        })
      }
    </div>
  )
}
