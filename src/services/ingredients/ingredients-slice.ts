import { createSelector, createSlice } from '@reduxjs/toolkit';

import { fetchIngredients } from '@services/ingredients/ingredients-actions';
import { INGREDIENT_TABS, UNKNOWN_ERROR_MESSAGE } from '@utils/constants';

import type { TIngredient, TIngredientType } from '@utils/types';

export type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export type TIngredientGroup = {
  value: TIngredientType;
  title: string;
  items: TIngredient[];
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null,
};

const selectItems = (state: TIngredientsState): TIngredient[] => state.items;

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: selectItems,
    selectIngredientsLoading: (state): boolean => state.isLoading,
    selectIngredientsError: (state): string | null => state.error,
    /** Ингредиенты, разложенные по группам в порядке вкладок навигации. */
    selectIngredientGroups: createSelector([selectItems], (items): TIngredientGroup[] =>
      INGREDIENT_TABS.map(({ value, title }) => ({
        value,
        title,
        items: items.filter((ingredient) => ingredient.type === value),
      }))
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state): void => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action): void => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action): void => {
        // Отменённый запрос (например, при размонтировании) — не ошибка.
        if (action.meta.aborted) {
          return;
        }

        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? UNKNOWN_ERROR_MESSAGE;
      });
  },
});

export const {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading,
  selectIngredientGroups,
} = ingredientsSlice.selectors;
