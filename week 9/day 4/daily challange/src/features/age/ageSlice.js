import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const UPDATE_DELAY = 700

export const ageUpAsync = createAsyncThunk(
  'age/ageUp',
  async () => new Promise((resolve) => setTimeout(resolve, UPDATE_DELAY)),
)

export const ageDownAsync = createAsyncThunk(
  'age/ageDown',
  async () => new Promise((resolve) => setTimeout(resolve, UPDATE_DELAY)),
  {
    condition: (_, { getState }) => getState().age.age > 0,
  },
)

const ageSlice = createSlice({
  name: 'age',
  initialState: {
    age: 25,
    loading: false,
    operation: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ageUpAsync.pending, (state) => {
        state.loading = true
        state.operation = 'up'
      })
      .addCase(ageUpAsync.fulfilled, (state) => {
        state.age += 1
        state.loading = false
        state.operation = null
      })
      .addCase(ageUpAsync.rejected, (state) => {
        state.loading = false
        state.operation = null
      })
      .addCase(ageDownAsync.pending, (state) => {
        state.loading = true
        state.operation = 'down'
      })
      .addCase(ageDownAsync.fulfilled, (state) => {
        state.age -= 1
        state.loading = false
        state.operation = null
      })
      .addCase(ageDownAsync.rejected, (state) => {
        state.loading = false
        state.operation = null
      })
  },
})

export default ageSlice.reducer