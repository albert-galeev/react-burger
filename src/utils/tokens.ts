import { STORAGE_KEYS } from '@utils/constants';
import { request, ServerError } from '@utils/request';

import type { TRequestOptions } from '@utils/request';
import type { TTokensResponse } from '@utils/types';

export function getAccessToken(): string {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? '';
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export function isTokenExists(): boolean {
  return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function saveTokens({ accessToken, refreshToken }: TTokensResponse): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
}

export function removeTokens(): void {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export async function refreshToken(): Promise<TTokensResponse> {
  const refreshData = await request<TTokensResponse>('auth/token', {
    body: JSON.stringify({ token: getRefreshToken() }),
  });

  saveTokens(refreshData);

  return refreshData;
}

export async function fetchWithRefresh<T>(
  endpoint: string,
  options: TRequestOptions
): Promise<T> {
  try {
    return await request<T>(endpoint, options);
  } catch (error) {
    if (
      error instanceof ServerError &&
      (error.statusCode === 401 || (error.statusCode === 403 && getRefreshToken()))
    ) {
      const refreshData = await refreshToken();

      return request<T>(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    }

    throw error;
  }
}
