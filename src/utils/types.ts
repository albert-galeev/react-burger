import type { Location } from 'react-router-dom';

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

/**
 * Ингредиент внутри конструктора. Один и тот же ингредиент можно добавить
 * несколько раз, поэтому `_id` не годится в качестве ключа списка — для этого
 * при добавлении генерируется собственный идентификатор `uid` (nanoid).
 */
export type TConstructorIngredient = TIngredient & {
  uid: string;
};

export type TBurger = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type TSortDragItem = {
  uid: string;
  index: number;
  initialIndex: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TLocationState = {
  from?: Location;
  backgroundLocation?: Location;
};

export type TServerResponse<T> = { success: boolean } & T;

export type TTokensResponse = TServerResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type TAuthResponse = TTokensResponse & { user: TUser };

export type TUserResponse = TServerResponse<{ user: TUser }>;

export type TMessageResponse = TServerResponse<{ message: string }>;
