import { Link } from 'react-router-dom';

import { ROUTES } from '@utils/constants';

import styles from './not-found.module.css';

export const NotFoundPage = (): React.JSX.Element => {
  return (
    <main className={styles.page}>
      <h1 className="text text_type_digits-large">404</h1>
      <p className="text text_type_main-medium mt-8">Страница не найдена</p>
      <Link
        className={`${styles.link} text text_type_main-default mt-8`}
        to={ROUTES.HOME}
      >
        Вернуться в конструктор
      </Link>
    </main>
  );
};
