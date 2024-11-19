import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials)
  return response.data
})

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer