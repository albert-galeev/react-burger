import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder } from '@utils/api';
import { UNKNOWN_ERROR_MESSAGE } from '@utils/constants';

/** Асинхронный экшен: оформление заказа. */
export const placeOrder = createAsyncThunk<number, string[], { rejectValue: string }>(
  'order/placeOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      return await createOrder(ingredientIds);
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE
      );
    }
  }
);
