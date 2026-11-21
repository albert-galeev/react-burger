import { NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@services/hooks';
import { logout } from '@services/user/user-actions';
import { selectIsLoading } from '@services/user/user-slice';
import { ROUTES } from '@utils/constants';

import styles from './profile.module.css';

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.link} ${isActive ? styles.link_active : ''} text text_type_main-medium`;

export const ProfilePage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);
  const isOrdersPage = useMatch(`${ROUTES.PROFILE_ORDERS}/*`);

  async function handleLogout(): Promise<void> {
    await dispatch(logout());
    void navigate(ROUTES.LOGIN);
  }

  return (
    <main className={styles.page}>
      <nav className={`${styles.menu} mr-15`}>
        <ul className={styles.list}>
          <li>
            <NavLink to={ROUTES.PROFILE} end className={getLinkClassName}>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.PROFILE_ORDERS} className={getLinkClassName}>
              История заказов
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.link} ${styles.logout} text text_type_main-medium`}
              onClick={() => void handleLogout()}
            >
              {isLoading ? 'Выход...' : 'Выход'}
            </button>
          </li>
        </ul>
        <p
          className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}
        >
          {isOrdersPage ? (
            'В этом разделе вы можете просмотреть свою историю заказов'
          ) : (
            <>
              В этом разделе вы можете
              <br />
              изменить свои персональные данные
            </>
          )}
        </p>
      </nav>
      <Outlet />
    </main>
  );
};
