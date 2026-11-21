import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/use-form';
import { api } from '@utils/api';
import { ROUTES, STORAGE_KEYS, UNKNOWN_ERROR_MESSAGE } from '@utils/constants';

import type { FormEvent } from 'react';

import styles from '../form-page.module.css';

export const ResetPasswordPage = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ password: '', token: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!localStorage.getItem(STORAGE_KEYS.RESET_PASSWORD_ALLOWED)) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.resetPassword(values);
      localStorage.removeItem(STORAGE_KEYS.RESET_PASSWORD_ALLOWED);
      void navigate(ROUTES.LOGIN, { replace: true });
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE);
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={(event) => void handleSubmit(event)}>
        <h1 className={`${styles.title} text text_type_main-medium`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          name="password"
          placeholder="Введите новый пароль"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <Input
          type="text"
          name="token"
          placeholder="Введите код из письма"
          value={values.token}
          onChange={handleChange}
          autoComplete="one-time-code"
        />
        {error && (
          <p className={`${styles.error} text text_type_main-default`}>{error}</p>
        )}
        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
          Сохранить
        </Button>
      </form>
      <p
        className={`${styles.hint} text text_type_main-default text_color_inactive mt-20`}
      >
        Вспомнили пароль?{' '}
        <Link className={styles.link} to={ROUTES.LOGIN}>
          Войти
        </Link>
      </p>
    </main>
  );
};
