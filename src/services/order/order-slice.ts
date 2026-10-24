import { createSlice } from '@reduxjs/toolkit';

import { placeOrder } from '@services/order/order-actions';
import { UNKNOWN_ERROR_MESSAGE } from '@utils/constants';

export type TOrderState = {
  /** Номер оформленного заказа. */
  number: number | null;
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
};

const initialState: TOrderState = {
  number: null,
  isLoading: false,
  error: null,
  isModalOpen: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    /** Закрытие модального окна стирает данные заказа. */
    closeOrderModal: (): TOrderState => initialState,
  },
  selectors: {
    selectOrderNumber: (state): number | null => state.number,
    selectOrderLoading: (state): boolean => state.isLoading,
    selectOrderError: (state): string | null => state.error,
    selectIsOrderModalOpen: (state): boolean => state.isModalOpen,
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state): void => {
        state.isLoading = true;
        state.error = null;
        state.number = null;
        state.isModalOpen = true;
      })
      .addCase(placeOrder.fulfilled, (state, action): void => {
        state.number = action.payload;
        state.isLoading = false;
      })
      .addCase(placeOrder.rejected, (state, action): void => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      });
  },
});

export const { closeOrderModal } = orderSlice.actions;

export const {
  selectIsOrderModalOpen,
  selectOrderError,
  selectOrderLoading,
  selectOrderNumber,
} = orderSlice.selectors;
