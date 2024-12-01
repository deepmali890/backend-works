import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (data, thunkApi) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/create-cart`, data)
        }
        catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
const initialState = {
    value: {},
    loading: false,
    error: null
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log(action.payload)
                // state.value = action.payload
                state.loading = false
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
                console.log("error => ", action.payload)
            })
    }


})

// export const { setParentCAtegory } = cartSlice.actions

export default cartSlice.reducer