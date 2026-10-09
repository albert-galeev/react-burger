import type { TIngredient } from '@utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient;

  const nutrition = [
    { title: 'Калории, ккал', value: calories },
    { title: 'Белки, г', value: proteins },
    { title: 'Жиры, г', value: fat },
    { title: 'Углеводы, г', value: carbohydrates },
  ];

  return (
    <div className={styles.details}>
      <img className={styles.image} src={image_large} alt={name} />
      <h3 className={`${styles.name} text text_type_main-medium mt-4`}>{name}</h3>
      <ul className={`${styles.nutrition} mt-8`}>
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
