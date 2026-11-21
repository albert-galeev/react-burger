import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from '@services/burger-constructor/constructor-slice';
import { ingredientDetailsSlice } from '@services/ingredient-details/ingredient-details-slice';
import { ingredientsSlice } from '@services/ingredients/ingredients-slice';
import { orderSlice } from '@services/order/order-slice';
import { userSlice } from '@services/user/user-slice';

export const rootReducer = combineSlices(
  constructorSlice,
  ingredientDetailsSlice,
  ingredientsSlice,
  orderSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.DEV,
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
