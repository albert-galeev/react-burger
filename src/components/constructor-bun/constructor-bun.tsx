import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { addIngredient } from '@services/burger-constructor/constructor-slice';
import { useAppDispatch } from '@services/hooks';
import { DND_TYPES } from '@utils/constants';

import type { TConstructorIngredient, TIngredient } from '@utils/types';

import styles from './constructor-bun.module.css';

type TConstructorBunProps = {
  bun: TConstructorIngredient | null;
  position: 'top' | 'bottom';
};

export const ConstructorBun = ({
  bun,
  position,
}: TConstructorBunProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const slotRef = useRef<HTMLDivElement>(null);

  const [{ canDrop }, drop] = useDrop<TIngredient, void, { canDrop: boolean }>({
    accept: DND_TYPES.BUN,
    drop: (item): void => {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({ canDrop: monitor.canDrop() }),
  });

  drop(slotRef);

  const isTop = position === 'top';

  return (
    <div className={`${styles.slot} ${isTop ? 'mb-4' : 'mt-4'} ml-8 mr-4`} ref={slotRef}>
      {bun ? (
        <ConstructorElement
          type={position}
          isLocked={true}
          text={`${bun.name} (${isTop ? 'верх' : 'низ'})`}
          price={bun.price}
          thumbnail={bun.image}
        />
      ) : (
        <p
          className={`${styles.placeholder} ${
            canDrop ? styles.placeholder_droppable : ''
          } text text_type_main-default`}
        >
          Выберите булки
        </p>
      )}
    </div>
  );
};
