import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { fetchIngredients } from '@services/ingredients/ingredients-actions';
import {
  selectIngredientsError,
  selectIngredientsLoading,
} from '@services/ingredients/ingredients-slice';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

  useEffect(() => {
    const request = dispatch(fetchIngredients());

    return (): void => {
      request.abort();
    };
  }, [dispatch]);

  const isReady = !isLoading && !error;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <div className={styles.column}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          {isLoading && <Preloader />}
          {!isLoading && error && (
            <div className={styles.status}>
              <p className="text text_type_main-medium">Что-то пошло не так</p>
              <p className="text text_type_main-default text_color_inactive">{error}</p>
            </div>
          )}
          {isReady && <BurgerIngredients />}
        </div>
        {isReady && <BurgerConstructor />}
      </main>
    </div>
  );
};

export default App;
