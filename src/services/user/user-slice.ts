import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import { login, logout, register, updateUser } from '@services/user/user-actions';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUser } from '@utils/types';

export type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>): void => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>): void => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectIsAuthChecked: (state): boolean => state.isAuthChecked,
    selectIsLoading: (state): boolean => state.isLoading,
    selectError: (state): string | null => state.error,
    selectUser: (state): TUser | null => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state): void => {
        state.isLoading = false;
        state.user = null;
      })
      .addMatcher(isPending(login, register, logout, updateUser), (state): void => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        isRejected(login, register, logout, updateUser),
        (state, action): void => {
          state.isLoading = false;
          state.error = action.error.message ?? null;
        }
      );
  },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;

export const { selectIsAuthChecked, selectIsLoading, selectError, selectUser } =
  userSlice.selectors;
