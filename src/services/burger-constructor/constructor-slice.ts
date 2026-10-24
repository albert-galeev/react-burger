import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

import { placeOrder } from '@services/order/order-actions';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TBurger, TConstructorIngredient, TIngredient } from '@utils/types';

export type TConstructorState = TBurger;

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

const selectBun = (state: TConstructorState): TConstructorIngredient | null => state.bun;

const selectFillings = (state: TConstructorState): TConstructorIngredient[] =>
  state.ingredients;

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>): void => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;

          return;
        }

        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient): { payload: TConstructorIngredient } => ({
        payload: { ...ingredient, uid: nanoid() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>): void => {
      state.ingredients = state.ingredients.filter(({ uid }) => uid !== action.payload);
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ): void => {
      const { fromIndex, toIndex } = action.payload;
      const [moved] = state.ingredients.splice(fromIndex, 1);

      if (moved) {
        state.ingredients.splice(toIndex, 0, moved);
      }
    },
    clearConstructor: (): TConstructorState => initialState,
  },
  selectors: {
    selectConstructorBun: selectBun,
    selectConstructorIngredients: selectFillings,
    selectIngredientCounters: createSelector(
      [selectBun, selectFillings],
      (bun, ingredients): Record<string, number> => {
        const counters: Record<string, number> = bun ? { [bun._id]: 2 } : {};

        ingredients.forEach(({ _id }) => {
          counters[_id] = (counters[_id] ?? 0) + 1;
        });

        return counters;
      }
    ),
    selectBurgerPrice: createSelector(
      [selectBun, selectFillings],
      (bun, ingredients): number =>
        ingredients.reduce((sum, { price }) => sum + price, bun ? bun.price * 2 : 0)
    ),
    selectOrderIngredientIds: createSelector(
      [selectBun, selectFillings],
      (bun, ingredients): string[] =>
        bun ? [bun._id, ...ingredients.map(({ _id }) => _id), bun._id] : []
    ),
    selectCanPlaceOrder: createSelector(
      [selectBun, selectFillings],
      (bun, ingredients): boolean => Boolean(bun) && ingredients.length > 0
    ),
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (): TConstructorState => initialState);
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  constructorSlice.actions;

export const {
  selectBurgerPrice,
  selectCanPlaceOrder,
  selectConstructorBun,
  selectConstructorIngredients,
  selectIngredientCounters,
  selectOrderIngredientIds,
} = constructorSlice.selectors;
