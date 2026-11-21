import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@services/hooks';
import {
  selectIngredientById,
  selectIngredientsLoading,
} from '@services/ingredients/ingredients-slice';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams<'id'>();
  const ingredient = useAppSelector((state) => selectIngredientById(state, id));
  const isLoading = useAppSelector(selectIngredientsLoading);

  if (!ingredient) {
    return isLoading ? (
      <Preloader />
    ) : (
      <p className="text text_type_main-medium">Ингредиент не найден</p>
    );
  }

  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  const nutrition = [
    { title: 'Калории,ккал', value: calories },
    { title: 'Белки, г', value: proteins },
    { title: 'Жиры, г', value: fat },
    { title: 'Углеводы, г', value: carbohydrates },
  ];

  return (
    <div className={styles.details}>
      <img className={styles.image} src={image_large} alt={name} />
      <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
      <ul className={styles.nutrition}>
        {nutrition.map(({ title, value }) => (
          <li className={styles.item} key={title}>
            <p className="text text_type_main-default text_color_inactive">{title}</p>
            <p className="text text_type_digits-default text_color_inactive">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
