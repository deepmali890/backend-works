import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fetchProduct= createAsyncThunk(
    'product/fetchProduct',
    async (_, thunkApi) => {
        try {
           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/products`)
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
    value: {},
    loading: false,
    error: null
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state,action) => {
                state.loading = true
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.value = action.payload
                state.loading = false
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
                console.log("error => ", action.payload)
            })
    }

})
// export const { } = productSlice.actions

export default productSlice.reducer