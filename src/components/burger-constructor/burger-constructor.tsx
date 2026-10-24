import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { ConstructorBun } from '@components/constructor-bun/constructor-bun';
import { ConstructorIngredient } from '@components/constructor-ingredient/constructor-ingredient';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import {
  addIngredient,
  selectBurgerPrice,
  selectCanPlaceOrder,
  selectConstructorBun,
  selectConstructorIngredients,
  selectOrderIngredientIds,
} from '@services/burger-constructor/constructor-slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { placeOrder } from '@services/order/order-actions';
import { closeOrderModal, selectIsOrderModalOpen } from '@services/order/order-slice';
import { DND_TYPES } from '@utils/constants';

import type { TIngredient, TSortDragItem } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector(selectConstructorBun);
  const ingredients = useAppSelector(selectConstructorIngredients);
  const totalPrice = useAppSelector(selectBurgerPrice);
  const canPlaceOrder = useAppSelector(selectCanPlaceOrder);
  const orderIngredientIds = useAppSelector(selectOrderIngredientIds);
  const isOrderModalOpen = useAppSelector(selectIsOrderModalOpen);

  const sectionRef = useRef<HTMLElement>(null);
  const fillingsRef = useRef<HTMLDivElement>(null);

  const [{ canDrop }, dropFilling] = useDrop<TIngredient, void, { canDrop: boolean }>({
    accept: DND_TYPES.INGREDIENT,
    drop: (item): void => {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({ canDrop: monitor.canDrop() }),
  });

  dropFilling(fillingsRef);

  const [, dropSorted] = useDrop<TSortDragItem, void, unknown>({
    accept: DND_TYPES.SORT,
    drop: (): void => {
      // Порядок уже изменён обработчиком hover, дополнительных действий не нужно.
    },
  });

  dropSorted(sectionRef);

  function handlePlaceOrder(): void {
    void dispatch(placeOrder(orderIngredientIds));
  }

  function handleCloseModal(): void {
    dispatch(closeOrderModal());
  }

  return (
    <section ref={sectionRef} className={`${styles.burger_constructor} pt-25 pl-4`}>
      <ConstructorBun bun={bun} position="top" />
      <div ref={fillingsRef} className={styles.fillings}>
        {ingredients.length > 0 ? (
          <ul className={`${styles.list} custom-scroll pr-2`}>
            {ingredients.map((ingredient, index) => (
              <ConstructorIngredient
                key={ingredient.uid}
                ingredient={ingredient}
                index={index}
              />
            ))}
          </ul>
        ) : (
          <p
            className={`${styles.placeholder} ${
              canDrop ? styles.placeholder_droppable : ''
            } ml-8 mr-4 text text_type_main-default`}
          >
            Выберите начинку
          </p>
        )}
      </div>
      <ConstructorBun bun={bun} position="bottom" />
      <div className={`${styles.total} mt-10 mr-4`}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={!canPlaceOrder}
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
