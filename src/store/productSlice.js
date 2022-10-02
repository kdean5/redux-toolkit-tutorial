import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//custom enum 
//freeze() does not allow to modify the object. (read only)
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    }
})

export const { setProducts, setStatus } = productSlice.actions;

export default productSlice.reducer;


// Thunks

// 1st way (Normal)👇
//Simple with reducers. No need of extraReducers in createSlice
// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const res = await fetch("https://fakestoreapi.com/products")
//             const data = await res.json();
//             dispatch(setProducts(data))
//             dispatch(setStatus(STATUSES.IDLE))
//         } catch (err) {
//             console.log(err)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }


// 2nd way (New)👇
//To implement this, need to add extraReducers property in createSlice and handle it.
//No need to define reducers which are related to thunk. so remove that
//first argument could be any string👇
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json();
    return data;
})