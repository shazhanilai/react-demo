import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface UserInfoState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UserInfoState = {
    loading: false,
    error: null,
    token: null
}

export const signIn = createAsyncThunk(
    'userInfo/signIn',
    async (paramaters: {
        email: string,
        password: string
    }, thunkAPI) => {
        const {data} = await axios.post(
            'http://123.56.149.216:8080/auth/login', {
                email: paramaters.email,
                password: paramaters.password
            }
        )
        return data.token
    }
)
export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        logOut: (state) => {
            state.loading = false
            state.token = null
            state.error = null
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.loading = false
            state.token = action.payload
        },
        [signIn.rejected.type]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})
