import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { useForm } from '@hooks/use-form';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { updateUser } from '@services/user/user-actions';
import { selectError, selectIsLoading, selectUser } from '@services/user/user-slice';

import type { TUpdateUserData } from '@utils/api';
import type { FormEvent } from 'react';

import styles from './profile-form.module.css';

export const ProfileFormPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const initialValues = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  };

  const { values, setValues, handleChange } = useForm(initialValues);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const isChanged =
    values.name !== initialValues.name ||
    values.email !== initialValues.email ||
    values.password !== '';

  function handleCancel(): void {
    setValues(initialValues);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const data: TUpdateUserData = {};

    values.name !== initialValues.name && (data.name = values.name);
    values.email !== initialValues.email && (data.email = values.email);
    values.password && (data.password = values.password);

    const result = await dispatch(updateUser(data));

    if (updateUser.fulfilled.match(result)) {
      setValues({ ...result.payload, password: '' });
    }
  }

  return (
    <form className={styles.form} onSubmit={(event) => void handleSubmit(event)}>
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        value={values.name}
        onChange={handleChange}
        autoComplete="name"
      />
      <EmailInput
        name="email"
        placeholder="Логин"
        isIcon
        value={values.email}
        onChange={handleChange}
        autoComplete="email"
      />
      <PasswordInput
        name="password"
        icon="EditIcon"
        value={values.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
      {error && <p className={`${styles.error} text text_type_main-default`}>{error}</p>}
      {isChanged && (
        <div className={styles.actions}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
