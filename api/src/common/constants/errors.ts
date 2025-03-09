export const ERRORS = {
    INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',

    USER_ALREADY_EXIST: 'Пользователь с таким логином уже существует',
    USER_IS_NOT_FOUND: 'Введен неверный логин или пароль',
    INVALID_PASSWORD: 'Введен неверный логин или пароль',
    INVALID_CREATOR_RESPONSIBLE_ERROR: 'Пользователь не является подчиненным этого руководителя',

    RESPONSIBLE_NOT_FOUND: 'Исполнитель не найден',

    TASK_NOT_FOUND: 'Задача не найдена',
    TASK_CREATOR_ERROR: 'Руководитель не является создателем этой задачи',
    TASK_RESPONSIBLE_ERROR: 'Пользователь не является исполнителем этой задачи',
};
