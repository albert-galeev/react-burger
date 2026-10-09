import type { TBurger, TIngredient } from '@utils/types';

const DEMO_FILLINGS_COUNT = 6;

export const getInitialBurger = (ingredients: TIngredient[]): TBurger => {
  const bun = ingredients.find((ingredient) => ingredient.type === 'bun') ?? null;
  const fillings = ingredients
    .filter((ingredient) => ingredient.type !== 'bun')
    .slice(0, DEMO_FILLINGS_COUNT)
    .map((ingredient, index) => ({ ...ingredient, uid: `${ingredient._id}-${index}` }));

  return { bun, fillings };
};

export const getBurgerPrice = ({ bun, fillings }: TBurger): number => {
  const bunsPrice = bun ? bun.price * 2 : 0;

  return fillings.reduce((sum, filling) => sum + filling.price, bunsPrice);
};

export const getIngredientCounters = ({
  bun,
  fillings,
}: TBurger): Record<string, number> => {
  const counters: Record<string, number> = bun ? { [bun._id]: 2 } : {};

  fillings.forEach(({ _id }) => {
    counters[_id] = (counters[_id] ?? 0) + 1;
  });

  return counters;
};
