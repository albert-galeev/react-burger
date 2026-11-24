import { useState } from 'react';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

type TUseForm<T> = {
  values: T;
  setValues: Dispatch<SetStateAction<T>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useForm = <T extends Record<string, string>>(
  initialValues: T
): TUseForm<T> => {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  }

  return { values, setValues, handleChange };
};
