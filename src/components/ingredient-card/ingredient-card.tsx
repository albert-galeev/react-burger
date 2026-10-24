import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { useAppDispatch } from '@services/hooks';
import { setIngredientDetails } from '@services/ingredient-details/ingredient-details-slice';
import { DND_TYPES } from '@utils/constants';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCardProps = {
  ingredient: TIngredient;
  count: number;
};

export const IngredientCard = ({
  ingredient,
  count,
}: TIngredientCardProps): React.JSX.Element => {
  const { image, name, price } = ingredient;

  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLButtonElement>(null);

  const [{ isDragging }, drag] = useDrag<TIngredient, void, { isDragging: boolean }>({
    type: ingredient.type === 'bun' ? DND_TYPES.BUN : DND_TYPES.INGREDIENT,
    item: ingredient,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(cardRef);

  function handleClick(): void {
    dispatch(setIngredientDetails(ingredient));
  }

  return (
    <li>
      <button
        type="button"
        ref={cardRef}
        className={`${styles.card} ${isDragging ? styles.card_dragging : ''} pl-4 pr-4`}
        onClick={handleClick}
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
