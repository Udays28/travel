import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchPackages = createAsyncThunk('packages/fetchPackages', async () => {
  const response = await axios.get(`${API_URL}/packages`)
  return response.data
})

export const fetchPackageById = createAsyncThunk('packages/fetchPackageById', async (id) => {
  const response = await axios.get(`${API_URL}/packages/${id}`)
  return response.data
})

const packageSlice = createSlice({
  name: 'packages',
  initialState: {
    items: [],
    currentPackage: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchPackageById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentPackage = action.payload
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default packageSlice.reducer