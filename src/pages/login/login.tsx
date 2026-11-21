import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';

import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { login } from '@services/user/user-actions';
import { selectError, selectIsLoading } from '@services/user/user-slice';
import { ROUTES } from '@utils/constants';

import type { TLocationState } from '@utils/types';
import type { FormEvent } from 'react';

import styles from '../form-page.module.css';

export const LoginPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { values, handleChange } = useForm({ email: '', password: '' });
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void dispatch(login(values));
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
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
          autoComplete="current-password"
        />
        {error && (
          <p className={`${styles.error} text text_type_main-default`}>{error}</p>
        )}
        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
          Войти
        </Button>
      </form>
      <p
        className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}
      >
        Вы — новый пользователь?{' '}
        <Link
          className={styles.link}
          to={ROUTES.REGISTER}
          state={location.state as TLocationState | null}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${styles.hint} text text_type_main-default text_color_inactive mt-4`}
      >
        Забыли пароль?{' '}
        <Link className={styles.link} to={ROUTES.FORGOT_PASSWORD}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};
