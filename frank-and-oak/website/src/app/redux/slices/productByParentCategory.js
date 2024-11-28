import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fatchProductByParentCategory = createAsyncThunk(
    "productByParentCategory/fatchProductByParentCategory",
    async (categoryName, thunkApi) => {
        try {
           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/products-by-parent-category/${categoryName}`)
           console.log(response.data)
           return response.data;
        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
const initialState = {
    value: {name:'dilip'},
    loading: false,
    error: null
}

export const productByParentCategorySlice = createSlice({
    name: 'productByParentCategory',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
        builder
        .addCase(fatchProductByParentCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fatchProductByParentCategory.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchProductByParentCategory.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = productByParentCategorySlice.actions

export default productByParentCategorySlice.reducer