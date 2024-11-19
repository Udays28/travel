import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchUserBookings = createAsyncThunk('bookings/fetchUserBookings', async (_, { getState }) => {
  const { auth } = getState()
  const response = await axios.get(`${API_URL}/bookings/user`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
  return response.data
})

export const fetchVendorBookings = createAsyncThunk('bookings/fetchVendorBookings', async (_, { getState }) => {
  const { auth } = getState()
  const response = await axios.get(`${API_URL}/bookings/vendor`, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
  return response.data
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData, { getState }) => {
  const { auth } = getState()
  const response = await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${auth.token}` },
  })
  return response.data
})

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchVendorBookings.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchVendorBookings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchVendorBookings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
  },
})

export default bookingSlice.reducer