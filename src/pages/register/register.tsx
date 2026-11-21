import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { register } from '@services/user/user-actions';
import { selectError, selectIsLoading } from '@services/user/user-slice';
import { ROUTES } from '@utils/constants';

import type { TLocationState } from '@utils/types';
import type { FormEvent } from 'react';

import styles from '../form-page.module.css';

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void dispatch(register(values));
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <EmailInput
          name="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        {error && (
          <p className={`${styles.error} text text_type_main-default`}>{error}</p>
        )}
        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}
      >
        Уже зарегистрированы?{' '}
        <Link
          className={styles.link}
          to={ROUTES.LOGIN}
          state={location.state as TLocationState | null}
        >
          Войти
        </Link>
      </p>
    </main>
  );
};
