import { CheckMarkIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';

import { useAppSelector } from '@services/hooks';
import {
  selectOrderError,
  selectOrderLoading,
  selectOrderNumber,
} from '@services/order/order-slice';
import { ORDER_DETAILS_TEXT } from '@utils/constants';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const number = useAppSelector(selectOrderNumber);
  const isLoading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);

  const { caption, status, hint } = ORDER_DETAILS_TEXT;

  if (isLoading) {
    return (
      <div className={styles.details}>
        <Preloader />
        <p className="text text_type_main-default mt-8">Оформляем заказ…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.details}>
        <p className="text text_type_main-medium">Не удалось оформить заказ</p>
        <p className="text text_type_main-default text_color_inactive mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.details}>
      <p className={`${styles.number} text text_type_digits-large`}>{number}</p>
      <p className="text text_type_main-medium mt-8">{caption}</p>
      <div className={`${styles.badge} mt-15`}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-15">{status}</p>
      <p className="text text_type_main-default text_color_inactive mt-2">{hint}</p>
    </div>
  );
};
