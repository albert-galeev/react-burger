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
 * у элемента конструктора есть собственный идентификатор `uid`.
 */
export type TConstructorIngredient = TIngredient & {
  uid: string;
};

export type TBurger = {
  bun: TIngredient | null;
  fillings: TConstructorIngredient[];
};
