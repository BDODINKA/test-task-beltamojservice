import Vue from "vue";
import Vuex from "vuex";
import type {
  ErrorModalType,
  FilterSearchType,
  NewUserType,
  PaginationDataType,
  UserDataType,
} from "@/helpers/types/types";
import { headers, headersWithStatus } from "@/helpers/constants/constants";
import {
  ErrorsResponce,
  FetchInstance,
  ProfileStatus,
  UsersActions,
  UsersMutations,
} from "@/helpers/types/enums";
import { fetcher } from "@/helpers/fetcher";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: [] as UserDataType[],
    pagination: { page: 1, limit: 5 } as PaginationDataType,
    headers: headers,
    usersForm: false,
    isLoading: false,
    isStatus: null,
    errorMessage: "",
    showErrorModal: false,
  },

  mutations: {
    SET_DATA: (state, payload: UserDataType[]) => {
      state.users = payload;
    },
    SET_HEADERS: (state, payload) => {
      if (payload === ProfileStatus.ALL) {
        state.headers = headersWithStatus;
      } else {
        state.headers = headers;
      }
    },
    CHANGE_USER: (state, payload: UserDataType) => {
      state.users = state.users.map((el) =>
        el.id === payload.id ? payload : el
      );
    },
    DELETE_USER: (state, payload: number) => {
      state.users = state.users.filter((el) => el.id !== payload);
    },
    SET_PAGINATION: (state, { page, limit }) => {
      if (!page) {
        state.pagination = { ...state.pagination, limit };
      } else {
        state.pagination = { ...state.pagination, page };
      }
    },
    SET_ERROR: (state, payload: ErrorModalType) => {
      state.errorMessage = payload.message;
      state.showErrorModal = payload.openModal;
    },
    SET_IS_LOADING: (state) => {
      state.isLoading = !state.isLoading;
    },
    SET_USER_FORM: (state, payload) => {
      state.usersForm = payload;
    },
  },

  actions: {
    fetchData: async ({ commit }) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          FetchInstance.BASE_URL,
          FetchInstance.GET
        );
        const data = await response.json();

        commit(UsersMutations.SET_DATA, data);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },
    fetchFilteredData: async ({ commit }, payload: FilterSearchType) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          `${FetchInstance.BASE_URL}?${payload.field}=${payload.value}`,
          FetchInstance.GET
        );
        const data = await response.json();
        commit(UsersMutations.SET_DATA, data);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },

    refreshData: async ({ dispatch }) => {
      await dispatch(UsersActions.FETCH_DATA);
      // await dispatch("getPaginate", store.state.pagination);
    },

    fetchDataById: async ({ commit }, payload: number) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          `${FetchInstance.BASE_URL}${payload}`,
          FetchInstance.GET
        );
        const data = await response.json();
        if (!response.ok) {
          commit(UsersMutations.SET_DATA, []);
        }
        commit(UsersMutations.SET_DATA, [data]);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },
    getPaginate: async ({ commit }, { page, limit }: PaginationDataType) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          `${FetchInstance.BASE_URL}?_page=${page}&_limit=${limit}`,
          FetchInstance.GET
        );

        const data = await response.json();

        if (!data.length) {
          commit(UsersMutations.SET_DATA, store.state.users);
        }
        commit(UsersMutations.SET_DATA, data);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },
    addUser: async ({ commit }, user: NewUserType) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          FetchInstance.BASE_URL,
          FetchInstance.POST,
          { ...user, status: false }
        );
        const data = await response.json();

        commit(UsersMutations.SET_DATA, [...store.state.users, data]);
        commit(UsersMutations.SET_USER_FORM, false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
          commit(UsersMutations.SET_ERROR, {
            message: ErrorsResponce.BASE_ERROR_RESPONCE,
            openModal: true,
          });
        } else {
          console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
        }
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },

    changeUserAllField: async ({ commit }, user: UserDataType) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          `${FetchInstance.BASE_URL}${user.id}`,
          FetchInstance.PUT,
          user
        );
        const data = await response.json();
        commit(UsersMutations.SET_USER_FORM, false);
        commit(UsersMutations.CHANGE_USER, data);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },
    changeUserSomeField: async ({ commit }, user: Partial<NewUserType>) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          FetchInstance.BASE_URL,
          FetchInstance.PATCH,
          user
        );
        const data = await response.json();

        commit(UsersMutations.CHANGE_USER, data);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },
    deleteUser: async ({ commit }, id: number) => {
      commit(UsersMutations.SET_IS_LOADING);
      try {
        const response = await fetcher(
          `${FetchInstance.BASE_URL}${id}`,
          FetchInstance.DELETE
        );
        if (!response.ok) {
          return;
        }
        commit(UsersMutations.DELETE_USER, id);
      } catch (error) {
        console.error(ErrorsResponce.BASE_ERROR_RESPONCE, error);
      } finally {
        commit(UsersMutations.SET_IS_LOADING);
      }
    },
  },
});
