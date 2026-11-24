import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import styles from './ingredient.module.css';

export const IngredientPage = (): React.JSX.Element => {
  return (
    <main className={styles.page}>
      <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
      <IngredientDetails />
    </main>
  );
};
