import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useRef, useState } from 'react';

import { IngredientCard } from '@components/ingredient-card/ingredient-card';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { selectIngredientCounters } from '@services/burger-constructor/constructor-slice';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import {
  clearIngredientDetails,
  selectIngredientDetails,
} from '@services/ingredient-details/ingredient-details-slice';
import { selectIngredientGroups } from '@services/ingredients/ingredients-slice';
import { INGREDIENT_TABS } from '@utils/constants';

import type { TIngredientType } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectIngredientGroups);
  const counters = useAppSelector(selectIngredientCounters);
  const selectedIngredient = useAppSelector(selectIngredientDetails);

  const [currentTab, setCurrentTab] = useState<TIngredientType>('bun');

  const groupsRef = useRef<HTMLUListElement>(null);
  const groupRefs = useRef<Partial<Record<TIngredientType, HTMLLIElement | null>>>({});

  function handleTabClick(value: string): void {
    setCurrentTab(value as TIngredientType);
    groupRefs.current[value as TIngredientType]?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleScroll(): void {
    const container = groupsRef.current;

    if (!container) {
      return;
    }

    const containerTop = container.getBoundingClientRect().top;
    let nearestTab = currentTab;
    let nearestDistance = Number.POSITIVE_INFINITY;

    INGREDIENT_TABS.forEach(({ value }) => {
      const group = groupRefs.current[value];

      if (!group) {
        return;
      }

      const distance = Math.abs(group.getBoundingClientRect().top - containerTop);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestTab = value;
      }
    });

    setCurrentTab(nearestTab);
  }

  function handleCloseModal(): void {
    dispatch(clearIngredientDetails());
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={`${styles.menu} mb-10`}>
          {INGREDIENT_TABS.map(({ value, title }) => (
            <Tab
              key={value}
              value={value}
              active={currentTab === value}
              onClick={handleTabClick}
            >
              {title}
            </Tab>
          ))}
        </ul>
      </nav>
      <ul
        className={`${styles.groups} custom-scroll`}
        ref={groupsRef}
        onScroll={handleScroll}
      >
        {groups.map(({ value, title, items }) => (
          <li
            key={value}
            ref={(element) => {
              groupRefs.current[value] = element;
            }}
          >
            <h2 className={`${styles.group_title} text text_type_main-medium mb-6`}>
              {title}
            </h2>
            <ul className={`${styles.cards} mb-10 pl-4 pr-4`}>
              {items.map((ingredient) => (
                <IngredientCard
                  key={ingredient._id}
                  ingredient={ingredient}
                  count={counters[ingredient._id] ?? 0}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
