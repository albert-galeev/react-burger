import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { getBurgerPrice } from '@utils/burger';

import type { TBurger } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  burger: TBurger;
};

export const BurgerConstructor = ({
  burger,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  function handleOpenModal(): void {
    setIsOrderOpen(true);
  }

  function handleCloseModal(): void {
    setIsOrderOpen(false);
  }

  const { bun, fillings } = burger;
  const totalPrice = getBurgerPrice(burger);
  const isOrderDisabled = !bun && fillings.length === 0;

  return (
    <section className={`${styles.burger_constructor} pt-25 pl-4`}>
      {bun && (
        <div className={`${styles.bun} mb-4 ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      {fillings.length > 0 ? (
        <ul className={`${styles.list} custom-scroll pr-2`}>
          {fillings.map((filling) => (
            <li className={styles.item} key={filling.uid}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={filling.name}
                price={filling.price}
                thumbnail={filling.image}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${styles.empty} ml-8 text text_type_main-default`}>
          Перетащите сюда начинки и соусы
        </p>
      )}
      {bun && (
        <div className={`${styles.bun} mt-4 ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={`${styles.total} mt-10 mr-4`}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={isOrderDisabled}
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
