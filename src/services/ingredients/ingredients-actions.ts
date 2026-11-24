import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '@utils/api';
import { UNKNOWN_ERROR_MESSAGE } from '@utils/constants';

import type { TIngredient } from '@utils/types';

/** Асинхронный экшен: загрузка списка ингредиентов с сервера. */
export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_arg, { signal, rejectWithValue }) => {
  try {
    return await api.getIngredients(signal);
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
    );
  }
});
