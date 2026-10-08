import type { TIngredientType } from '@utils/types';

export const API_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

export const INGREDIENT_TABS: { value: TIngredientType; title: string }[] = [
  { value: 'bun', title: 'Булки' },
  { value: 'sauce', title: 'Соусы' },
  { value: 'main', title: 'Начинки' },
];

export const ORDER_PLACEHOLDER = {
  number: 34536,
  caption: 'идентификатор заказа',
  status: 'Ваш заказ начали готовить',
  hint: 'Дождитесь готовности на орбитальной станции',
};
