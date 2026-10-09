import { API_BASE_URL } from '@utils/constants';

import type { TIngredient } from '@utils/types';

type TServerResponse<T> = { success: boolean } & T;

type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`Не удалось получить данные с сервера: ошибка ${res.status}`);
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
