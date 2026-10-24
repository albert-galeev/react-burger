import { API_BASE_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TServerResponse<T> = { success: boolean } & T;

type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

type TOrderResponse = TServerResponse<{ name: string; order: { number: number } }>;

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`Сервер ответил ошибкой: ${res.status}`);
  }

  return (await res.json()) as T;
};

export const getIngredients = async (signal?: AbortSignal): Promise<TIngredient[]> => {
  const res = await fetch(`${API_BASE_URL}/ingredients`, { signal });
  const { success, data } = await checkResponse<TIngredientsResponse>(res);

  if (!success || !Array.isArray(data)) {
    throw new Error('Сервер вернул некорректный ответ');
  }

  return data;
};

export const createOrder = async (
  ingredientIds: string[],
  signal?: AbortSignal
): Promise<number> => {
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ ingredients: ingredientIds }),
    signal,
  });
  const { success, order } = await checkResponse<TOrderResponse>(res);

  if (!success || typeof order?.number !== 'number') {
    throw new Error('Сервер вернул некорректный ответ');
  }

  return order.number;
};
