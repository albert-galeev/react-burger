import { createAsyncThunk } from '@reduxjs/toolkit';

import { setIsAuthChecked, setUser } from '@services/user/user-slice';
import { api } from '@utils/api';
import { isTokenExists } from '@utils/tokens';

import type { TLoginData, TRegisterData, TUpdateUserData } from '@utils/api';
import type { TUser } from '@utils/types';

export const register = createAsyncThunk(
  'user/register',
  async (formData: TRegisterData): Promise<TUser> => {
    const response = await api.register(formData);
    return response.user;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (formData: TLoginData): Promise<TUser> => {
    const response = await api.login(formData);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async (): Promise<void> => {
  await api.logout();
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (formData: TUpdateUserData): Promise<TUser> => {
    const response = await api.updateUser(formData);
    return response.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }): Promise<void> => {
    try {
      if (isTokenExists()) {
        const response = await api.getUser();
        dispatch(setUser(response.user));
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
