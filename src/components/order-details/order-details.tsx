import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import { ORDER_PLACEHOLDER } from '@utils/constants';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const { number, caption, status, hint } = ORDER_PLACEHOLDER;

  return (
    <div className={`${styles.details} pt-4`}>
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
