import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { getIngredients } from '@utils/api';
import { getIngredientCounters, getInitialBurger } from '@utils/burger';

import type { TIngredient } from '@utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getIngredients(signal)
      .then((data) => {
        setIngredients(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (signal.aborted) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setIsLoading(false);
      });

    return (): void => {
      controller.abort();
    };
  }, []);

  const burger = useMemo(() => getInitialBurger(ingredients), [ingredients]);
  const counters = useMemo(() => getIngredientCounters(burger), [burger]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {isLoading && <Preloader />}
      {!isLoading && error && (
        <div className={styles.status}>
          <p className="text text_type_main-medium">Что-то пошло не так</p>
          <p className="text text_type_main-default text_color_inactive">{error}</p>
        </div>
      )}
      {!isLoading && !error && (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} counters={counters} />
          <BurgerConstructor burger={burger} />
        </main>
      )}
    </div>
  );
};

export default App;
