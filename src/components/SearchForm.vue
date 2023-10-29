<template>
  <v-form @submit.prevent="submitForm">
    <v-row>
      <v-text-field
        v-model="searchText"
        @keydown.enter="submitForm"
        background-color="white"
        placeholder="Поиск"
        hide-details
        outlined
        @click:append="submitForm"
        append-icon="mdi-magnify"
      />
      <v-spacer style="width: 20px" />
      <v-select
        :items="items"
        label="Выберите поле поиска"
        v-model="searchField"
        background-color="white"
        hide-details
        outlined
        style="width: 170px"
      />
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ErrorMessage,
  UsersActions,
  UsersMutations,
} from "@/helpers/types/enums";
import { UserSelectSearch } from "@/helpers/constants/constants";

export default defineComponent({
  name: "SearchForm",

  data() {
    return {
      searchText: "",
      searchField: "",
      items: UserSelectSearch,
    };
  },
  methods: {
    submitForm() {
      if (this.searchField && this.searchText) {
        this.$store.dispatch(UsersActions.FETCH_FILTERED_DATA, {
          field: this.searchField,
          value: this.searchText,
        });
      }
      if (!this.searchField) {
        this.$store.commit(UsersMutations.SET_ERROR, {
          message: ErrorMessage.NOT_SELECTED_FIELD,
          openModal: true,
        });
      }
      if (!this.searchText) {
        this.$store.commit(UsersMutations.SET_ERROR, {
          message: ErrorMessage.FIELD_SEARCH_EMPTY,
          openModal: true,
        });
      }
    },
  },
});
</script>

<style scoped></style>
