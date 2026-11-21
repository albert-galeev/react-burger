import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { useAppSelector } from '@services/hooks';
import {
  selectIngredientsError,
  selectIngredientsLoading,
} from '@services/ingredients/ingredients-slice';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const isLoading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

  const isReady = !isLoading && !error;

  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};
