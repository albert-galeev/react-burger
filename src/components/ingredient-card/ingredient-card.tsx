import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count: number;
  onClick: (ingredient: TIngredient) => void;
};

export const IngredientCard = ({
  ingredient,
  count,
  onClick,
}: TIngredientCardProps): React.JSX.Element => {
  const { image, name, price } = ingredient;

  return (
    <li>
      <button
        type="button"
        className={`${styles.card} pl-4 pr-4`}
        onClick={() => onClick(ingredient)}
      >
        <span className={styles.media}>
          <img className={styles.image} src={image} alt={name} />
          {count > 0 && <Counter count={count} size="default" />}
        </span>
        <p className={`${styles.price} text text_type_digits-default mt-1`}>
          {price}
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.name} text text_type_main-default mt-1`}>{name}</p>
      </button>
    </li>
  );
};
