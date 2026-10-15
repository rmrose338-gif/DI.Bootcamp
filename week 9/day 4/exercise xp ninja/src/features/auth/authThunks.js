import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 450))

    if (!email?.trim() || !password) {
      return rejectWithValue('Enter an email and password to continue.')
    }

    const firstName = email.trim().split('@')[0].split(/[._-]/)[0]
    return {
      email: email.trim(),
      name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    }
  },
)