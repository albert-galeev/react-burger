import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, NavLink, useMatch } from 'react-router-dom';

import { ROUTES } from '@utils/constants';

import styles from './app-header.module.css';

const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  `${styles.link} ${isActive ? styles.link_active : ''}`;

export const AppHeader = (): React.JSX.Element => {
  const isIngredientPage = Boolean(useMatch(ROUTES.INGREDIENT));

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={ROUTES.HOME}
            end
            className={({ isActive }) =>
              getLinkClassName({ isActive: isActive || isIngredientPage })
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon
                  type={isActive || isIngredientPage ? 'primary' : 'secondary'}
                />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink
            to={ROUTES.FEED}
            className={(state) => `${getLinkClassName(state)} ${styles.link_feed}`}
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <Logo />
        </Link>
        <NavLink
          to={ROUTES.PROFILE}
          className={(state) =>
            `${getLinkClassName(state)} ${styles.link_position_last}`
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
