import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types';

export type TIngredientDetailsState = {
  ingredient: TIngredient | null;
};

const initialState: TIngredientDetailsState = {
  ingredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredientDetails: (state, action: PayloadAction<TIngredient>): void => {
      state.ingredient = action.payload;
    },
    clearIngredientDetails: (): TIngredientDetailsState => initialState,
  },
  selectors: {
    selectIngredientDetails: (state): TIngredient | null => state.ingredient,
  },
});

export const { setIngredientDetails, clearIngredientDetails } =
  ingredientDetailsSlice.actions;

export const { selectIngredientDetails } = ingredientDetailsSlice.selectors;
