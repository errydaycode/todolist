import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "app/model/appSlice";
import { authAPI, LoginParamsType } from "features/auth/api/auth.api";
import { clearTasksAndTodolists } from "common/actions";
import { createAppAsyncThunk } from "common/utils";
import { ResultCode } from "common/enums";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  "auth/login",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      if (res.data.resultCode === ResultCode.Captcha) {
        dispatch(getCaptchaUrl());
      }
      return rejectWithValue(res.data);
    }
  },
);

const getCaptchaUrl = createAppAsyncThunk<{ captchaUrl: string }, void>(
  "auth/captcha",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let res = await authAPI.getCaptchaUrl();
    if (res.data) {
      let captchaUrl = res.data.url;
      return { captchaUrl };
    } else {
      return rejectWithValue(null);
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "auth/logout",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodolists());
      return { isLoggedIn: false };
    } else {
      return rejectWithValue(null);
    }
  },
);

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "auth/initializeApp",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    const res = await authAPI.me().finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }));
    });
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captchaUrl: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload.captchaUrl;
      })
      .addMatcher(
        isFulfilled(
          authThunks.login,
          authThunks.logout,
          authThunks.initializeApp,
        ),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      );
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };
