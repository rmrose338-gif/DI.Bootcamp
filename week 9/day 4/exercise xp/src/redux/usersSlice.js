import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const USER_API_URL = 'https://jsonplaceholder.typicode.com/users/1'

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async ({ simulateFailure = false } = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        simulateFailure ? `${USER_API_URL}/unavailable` : USER_API_URL,
      )

      if (!response.ok) {
        return rejectWithValue(`Request failed with status ${response.status}.`)
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unable to fetch user data.')
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Unable to fetch user data.'
      })
  },
})

export default usersSlice.reducer