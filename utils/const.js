const BAD_REQUEST = {
  statusCode: 400,
  name: 'ValidationError',
  message: {
    createMovie: 'Переданы некорректные данные при создании фильма',
    deleteMovie: 'Передан невалидный _id',
    updateUser: 'Переданы некорректные данные при обновлении пользователя',
    createUser: 'Переданы некорректные данные при создании пользователя',
  },
};
const UNAUTHORIZED = {
  statusCode: 401,
  name: 'UnauthorizedError',
  message: {
    login: 'Неправильные почта или пароль',
    auth: 'Пользователь не авторизован',
  },
};
const FORBIDDEN = {
  statusCode: 403,
  name: 'ForbiddenError',
  message: {
    deleteMovie: 'Доступ к ресурсу запрещен',
  },
};
const NOT_FOUND = {
  statusCode: 404,
  name: 'DocumentNotFoundError',
  message: {
    getMovies: 'Текущий пользователь не сохранял фильмы',
    deleteMovie: 'Фильм с указанным _id не найдена',
    userNoExist: 'Такого пользователя не существует',
    routes: 'Данная страница не найдена',
  },
};
const DUPLICATE_KEY_ERROR = {
  statusCode: 409,
  name: 'DuplicateKeyError',
  message: {
    createUser: 'Пользователь с таким email уже существует',
  },
};
const SERVER_ERROR = {
  statusCode: 500,
  message: 'Что-то пошло не так',
};

const RegExpURL = /^(https?:\/\/(www\.)?)([-a-zA-Z0-9\W]){1,}/;

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  DUPLICATE_KEY_ERROR,
  SERVER_ERROR,
  RegExpURL,
};
