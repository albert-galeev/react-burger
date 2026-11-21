import { request } from '@utils/request';
import {
  fetchWithRefresh,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
} from '@utils/tokens';

import type {
  TAuthResponse,
  TIngredient,
  TMessageResponse,
  TServerResponse,
  TUser,
  TUserResponse,
} from '@utils/types';

type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

type TOrderResponse = TServerResponse<{ name: string; order: { number: number } }>;

export type TRegisterData = TUser & { password: string };

export type TLoginData = Omit<TRegisterData, 'name'>;

export type TUpdateUserData = Partial<TRegisterData>;

export type TResetPasswordData = { password: string; token: string };

async function getIngredients(signal?: AbortSignal): Promise<TIngredient[]> {
  const response = await request<TIngredientsResponse>('ingredients', {
    method: 'GET',
    signal,
  });

  return response.data;
}

async function createOrder(ingredientIds: string[]): Promise<number> {
  const response = await fetchWithRefresh<TOrderResponse>('orders', {
    headers: { authorization: getAccessToken() },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });

  return response.order.number;
}

async function register(formData: TRegisterData): Promise<TAuthResponse> {
  const response = await request<TAuthResponse>('auth/register', {
    body: JSON.stringify(formData),
  });

  saveTokens(response);

  return response;
}

async function login(formData: TLoginData): Promise<TAuthResponse> {
  const response = await request<TAuthResponse>('auth/login', {
    body: JSON.stringify(formData),
  });

  saveTokens(response);

  return response;
}

async function logout(): Promise<TMessageResponse> {
  const response = await request<TMessageResponse>('auth/logout', {
    body: JSON.stringify({ token: getRefreshToken() }),
  });

  removeTokens();

  return response;
}

async function getUser(): Promise<TUserResponse> {
  return await fetchWithRefresh<TUserResponse>('auth/user', {
    method: 'GET',
    headers: { authorization: getAccessToken() },
  });
}

async function updateUser(formData: TUpdateUserData): Promise<TUserResponse> {
  return await fetchWithRefresh<TUserResponse>('auth/user', {
    method: 'PATCH',
    headers: { authorization: getAccessToken() },
    body: JSON.stringify(formData),
  });
}

async function forgotPassword(email: string): Promise<TMessageResponse> {
  return await request<TMessageResponse>('password-reset', {
    body: JSON.stringify({ email }),
  });
}

async function resetPassword(formData: TResetPasswordData): Promise<TMessageResponse> {
  return await request<TMessageResponse>('password-reset/reset', {
    body: JSON.stringify(formData),
  });
}

export const api = {
  getIngredients,
  createOrder,
  register,
  login,
  logout,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword,
};
