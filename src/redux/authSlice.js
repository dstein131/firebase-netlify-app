// src/redux/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// Async Thunks

// Sign Up User
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        email: user.email,
        phone: user.phoneNumber || null,
        createdAt: new Date(),
      });

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Log In User
export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optionally, fetch additional user data from Firestore if needed

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Log Out User
export const logOutUser = createAsyncThunk("auth/logOutUser", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Listen to Auth State Changes
export const listenToAuthChanges = createAsyncThunk(
  "auth/listenToAuthChanges",
  async (_, thunkAPI) => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            resolve(user);
          } else {
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
);

// Initial State
const initialState = {
  user: null,
  error: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Additional synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Log In
      .addCase(logInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Log Out
      .addCase(logOutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Listen to Auth Changes
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(listenToAuthChanges.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default authSlice.reducer;
