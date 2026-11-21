import { API_BASE_URL, DEFAULT_OPTIONS } from '@utils/constants';

export type TRequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
};

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

export async function checkResponse<T>(response: Response): Promise<T> {
  const res = (await response.json()) as T & { message?: string };

  if (response.ok) {
    return res;
  }

  throw new ServerError(
    res.message ?? `Сервер ответил ошибкой: ${response.status}`,
    response.status
  );
}

export async function request<T>(
  endpoint: string,
  options: TRequestOptions = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: { ...DEFAULT_OPTIONS.headers, ...options.headers },
  });

  return await checkResponse<T>(response);
}
