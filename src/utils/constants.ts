import type { TIngredientType } from '@utils/types';

export const API_BASE_URL = 'https://norma.ffapi.ru/api';

export const INGREDIENT_TABS: { value: TIngredientType; title: string }[] = [
  { value: 'bun', title: 'Булки' },
  { value: 'sauce', title: 'Соусы' },
  { value: 'main', title: 'Начинки' },
];

export const DND_TYPES = {
  BUN: 'bun',
  INGREDIENT: 'ingredient',
  SORT: 'constructor-ingredient',
} as const;

export const ORDER_DETAILS_TEXT = {
  caption: 'идентификатор заказа',
  status: 'Ваш заказ начали готовить',
  hint: 'Дождитесь готовности на орбитальной станции',
};

export const UNKNOWN_ERROR_MESSAGE = 'Неизвестная ошибка';
