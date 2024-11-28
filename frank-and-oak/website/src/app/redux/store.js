import { configureStore } from '@reduxjs/toolkit'
import  parentCategorySlice  from './slices/parentCategorySlice'
import  productByParentCategorySlice  from './slices/productByParentCategory'

export const store = configureStore({
  reducer: {
    // Add your reducers here
    parentCategory:parentCategorySlice,
    productByParentCategory:productByParentCategorySlice
  },
})