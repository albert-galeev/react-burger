import type { TIngredientType } from '@utils/types';

export const API_BASE_URL = 'https://new-stellarburgers.education-services.ru/api';

export const DEFAULT_OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  RESET_PASSWORD_ALLOWED: 'resetPasswordAllowed',
} as const;

export const ROUTES = {
  HOME: '/',
  INGREDIENT: '/ingredients/:id',
  FEED: '/feed',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
} as const;

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
