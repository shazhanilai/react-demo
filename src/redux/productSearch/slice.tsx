import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface productSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}

const initialState: productSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null
}
export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct",
    async(parameters: {
        keywords?: string| null,
        nextPage: number|string,
        pageSize: number|string
    }, thunkApi) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`;
        if (parameters.keywords) {
            url += `&keyword=${parameters.keywords}`
        }
        console.log(url)
        const response = await axios.get(url)

        return {
            data: response.data,
            pagination: JSON.parse(response.headers['x-pagination'])
        }
    }
)
export const productSearchSlice = createSlice({
        name: "productSearch",
        initialState,
        reducers:{},
        extraReducers:{
            [searchProduct.pending.type]: (state) => {
                state.loading = true
            },
            [searchProduct.fulfilled.type]: (state, action) => {
                state.data = action.payload.data
                state.pagination = action.payload.pagination
                state.loading = false
                state.error = null
            },
            [searchProduct.rejected.type]: (state, action) => {
                state.loading = false

                state.error = action.error.message
            }
        },
    }
)
