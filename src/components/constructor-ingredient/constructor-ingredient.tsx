import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  moveIngredient,
  removeIngredient,
} from '@services/burger-constructor/constructor-slice';
import { useAppDispatch } from '@services/hooks';
import { DND_TYPES } from '@utils/constants';

import type { TConstructorIngredient, TSortDragItem } from '@utils/types';

import styles from './constructor-ingredient.module.css';

type TConstructorIngredientProps = {
  ingredient: TConstructorIngredient;
  index: number;
};

export const ConstructorIngredient = ({
  ingredient,
  index,
}: TConstructorIngredientProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag<TSortDragItem, void, { isDragging: boolean }>({
    type: DND_TYPES.SORT,
    item: () => ({ uid: ingredient.uid, index, initialIndex: index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (item, monitor): void => {
      if (!monitor.didDrop() && item.index !== item.initialIndex) {
        dispatch(moveIngredient({ fromIndex: item.index, toIndex: item.initialIndex }));
      }
    },
  });

  const [, drop] = useDrop<TSortDragItem, void, unknown>({
    accept: DND_TYPES.SORT,
    hover: (item, monitor): void => {
      const element = itemRef.current;

      if (!element || item.index === index) {
        return;
      }

      // Меняем ингредиенты местами, только когда курсор пересёк середину
      // соседнего элемента, — иначе порядок «дрожит».
      const { top, bottom } = element.getBoundingClientRect();
      const middle = (bottom - top) / 2;
      const offset = monitor.getClientOffset();

      if (!offset) {
        return;
      }

      const hoverOffset = offset.y - top;

      if (item.index < index && hoverOffset < middle) {
        return;
      }

      if (item.index > index && hoverOffset > middle) {
        return;
      }

      dispatch(moveIngredient({ fromIndex: item.index, toIndex: index }));
      item.index = index;
    },
  });

  drag(drop(itemRef));

  function handleRemove(): void {
    dispatch(removeIngredient(ingredient.uid));
  }

  return (
    <li
      ref={itemRef}
      className={`${styles.item} ${isDragging ? styles.item_dragging : ''}`}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleRemove}
      />
    </li>
  );
};
