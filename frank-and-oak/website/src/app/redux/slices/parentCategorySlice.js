import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fatchParentCAtegory = createAsyncThunk(
    "parentCategories/fatchParentCAtegory",
    async (_, thunkApi) => {
        try {
           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parent-categorys/active-category`)
        //    console.log(response.data)
           return response.data.data;
        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
const initialState = {
    value: [],
    loading: false,
    error: null
}

export const parentCategorySlice = createSlice({
    name: 'parentCategory',
    initialState,
    reducers: {
        setParentCAtegory : (state,action)=>{
            state.value = action.payload 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fatchParentCAtegory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fatchParentCAtegory.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchParentCAtegory.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

export const { setParentCAtegory } = parentCategorySlice.actions

export default parentCategorySlice.reducer