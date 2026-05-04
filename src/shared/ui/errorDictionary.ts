export const ERROR_MESSAGES = {
  network: 'Нет подключения к интернету',

  server: 'Ошибка сервера. Попробуйте позже',
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',

  unauthorized: 'Необходима авторизация',
  UNAUTHORIZED: 'Необходима авторизация',

  not_found: 'Ресурс не найден',
  NOT_FOUND: 'Ресурс не найден',

  validation: 'Некорректные данные запроса',
  VALIDATION_ERROR: 'Некорректные данные запроса',

  unknown: 'Что-то пошло не так',
} as const satisfies Record<string, string>;

export type ErrorDictionaryKey = keyof typeof ERROR_MESSAGES;
