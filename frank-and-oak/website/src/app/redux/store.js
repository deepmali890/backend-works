import { configureStore } from '@reduxjs/toolkit'
import  parentCategorySlice  from './slices/parentCategorySlice'
import  productByParentCategorySlice  from './slices/productByParentCategory'
import  cartSlice  from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    // Add your reducers here
    parentCategory:parentCategorySlice,
    productByParentCategory:productByParentCategorySlice,
    cart:cartSlice
  },
})