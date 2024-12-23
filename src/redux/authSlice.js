import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

// Async Thunks

// Sign Up User
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, firstName, lastName, username, phone }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail } = userCredential.user;

      const userData = {
        uid,
        email: userEmail,
        firstName: firstName || "Unknown",
        lastName: lastName || "User",
        username: username || "Anonymous",
        phone: phone || null,
        createdAt: new Date(),
      };

      // Save the user data in Firestore
      await setDoc(doc(db, "users", uid), userData);

      return userData;
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
      const { uid } = userCredential.user;

      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }

      return userDoc.data();
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
        async (user) => {
          if (user) {
            const { uid } = user;
            try {
              // Retrieve user data from Firestore
              const userDoc = await getDoc(doc(db, "users", uid));
              if (!userDoc.exists()) {
                reject(new Error("User data not found in Firestore."));
              } else {
                resolve(userDoc.data());
              }
            } catch (error) {
              reject(error);
            }
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
  reducers: {},
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
      .addCase(listenToAuthChanges.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listenToAuthChanges.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(listenToAuthChanges.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
