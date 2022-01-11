import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    login: string,
    isAuth: boolean
}

const initialState: AuthState = {
    login: '',
    isAuth: false
}

export const ADMIN: string = 'admin'

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload
        }
    }
})

export const { setAuth, setLogin } = authSlice.actions

export default authSlice.reducer;
