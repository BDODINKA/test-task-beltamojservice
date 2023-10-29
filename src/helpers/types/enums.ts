export enum ActionsButton {
  ADD = "Добавить",
  CHANGE = "Изменить",
  DELETE = "Удалить",
}

export enum ProfileStatus {
  ALL = "Все",
  PROCESSED = "Обработанные",
  RAW = "Необработанные",
}

export enum PathName {
  MAIN = "/",
  COMPLETED = "/completed",
  FAILED = "/failed",
}

export enum ErrorsResponce {
  BASE_ERROR_RESPONCE = "Ошибка при выполнении запроса:",
}

export enum ValidationError {
  FIELD_REQUIRED = "Поле является обязательным",
  FIELD_EMAIL = "Неверный формат Email",
  FIELD_PHONE = "Неверный формат телефонного номера",
}

export enum FetchInstance {
  BASE_URL = "https://retoolapi.dev/D6xLg4/data/",
  CONTENT_TYPE_JSON = "application/json",
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum ResponceStatus {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export enum UsersMutations {
  SET_DATA = "SET_DATA",
  SET_HEADERS = "SET_HEADERS",
  CHANGE_USER = "CHANGE_USER",
  DELETE_USER = "DELETE_USER",
  SET_PAGINATION = "SET_PAGINATION",
  SET_ERROR = "SET_ERROR",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_USER_FORM = "SET_USER_FORM",
}

export enum UsersActions {
  FETCH_DATA = "fetchData",
  REFRESH_DATA = "refreshData",
  FETCH_DATA_BY_ID = "fetchDataById",
  FETCH_FILTERED_DATA = "fetchFilteredData",
  GET_PAGINATE = "getPaginate",
  ADD_USER = "addUser",
  CHANGE_USER_ALL = "changeUserAllField",
  CHANGE_USER_SOME = "changeUserSomeField",
  DELETE_USER = "deleteUser",
}

export enum ErrorMessage {
  NOT_SELECTED_USER = "Необходимо выбрать пользователя",
  NOT_SELECTED_FIELD = "Необходимо выбрать поле",
  FIELD_SEARCH_EMPTY = "Необходимо заполнить Поиск",
}
