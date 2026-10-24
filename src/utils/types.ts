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
