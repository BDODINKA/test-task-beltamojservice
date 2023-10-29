<template>
  <v-col>
    <v-row no-gutters>
      <v-row no-gutters>
        <h2>{{ title }}</h2>
        <v-spacer style="max-width: 12px" />
        <v-btn density="compact" icon @click="refresh">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-row>
      <DropDownMenu :actions="actionItems" @update:onClick="actionsBtn" />
    </v-row>
    <v-spacer style="height: 12px" />
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="users"
      single-select
      @update:page="handlePageChange"
      @update:items-per-page="handlePerPageChange"
      mobile-breakpoint="1280"
      :fixed-header="true"
      :height="500"
      @click:row="handleClickSelect"
      :items-per-page="itemsPerPage"
      :page="itemsPage"
    >
      <template v-slot:item.status="{ item }">
        <v-icon v-if="item?.status === true" color="primary"
          >mdi-cloud-check-variant
        </v-icon>
        <v-icon v-if="item?.status === false" color="red"
          >mdi-cloud-cancel
        </v-icon>
      </template>
    </v-data-table>
    <FormUser :init-values="selected[0]" :actions="menuAction" />
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DropDownMenu from "@/components/DropDownMenu.vue";
import FormUser from "@/components/FormUser.vue";
import {
  ActionsButton,
  ErrorMessage,
  ProfileStatus,
  UsersActions,
  UsersMutations,
} from "@/helpers/types/enums";
import type { UserDataType } from "@/helpers/types/types";

export default defineComponent({
  name: "TableUsers",
  components: { DropDownMenu, FormUser },
  props: {
    initValues: {
      type: Array as () => UserDataType[],
      default: () => [],
    },
    title: { type: String, required: true },
  },
  data() {
    return {
      actionItems: [
        { title: ActionsButton.ADD },
        { title: ActionsButton.CHANGE },
        { title: ActionsButton.DELETE },
      ],
      users: this.initValues,
      selected: [] as UserDataType[],
      menuAction: "",
    };
  },
  watch: {
    initValues() {
      this.users = this.initValues;
    },
    title() {
      if (this.title === ProfileStatus.ALL) {
        this.fetchData();
      }
      if (this.title === ProfileStatus.PROCESSED) {
        this.fetchFilteredData(true);
      }
      if (this.title === ProfileStatus.RAW) {
        this.fetchFilteredData(false);
      }
    },
  },
  computed: {
    headers(): UserDataType[] {
      this.$store.commit(UsersMutations.SET_HEADERS, this.title);
      return this.$store.state.headers;
    },
    itemsPerPage() {
      return this.$store.state.pagination.limit;
    },
    itemsPage() {
      return this.$store.state.pagination.page;
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch(UsersActions.FETCH_DATA);
    },

    fetchFilteredData(status: boolean) {
      this.$store.dispatch(UsersActions.FETCH_FILTERED_DATA, {
        field: "status",
        value: status,
      });
    },
    refresh() {
      this.$store.dispatch(UsersActions.REFRESH_DATA);
    },
    handlePageChange(page: number) {
      this.$store.commit(UsersMutations.SET_PAGINATION, { page });
    },
    handlePerPageChange(limit: number) {
      this.$store.commit(UsersMutations.SET_PAGINATION, { limit });
    },
    handleClickSelect(item: UserDataType, slot: any) {
      slot.select(!slot.isSelected);
    },
    actionsBtn(title: ActionsButton) {
      if (title === ActionsButton.ADD) {
        this.menuAction = UsersActions.ADD_USER;
        this.$store.commit(UsersMutations.SET_USER_FORM, true);
        this.selected = [];
      }
      if (title === ActionsButton.CHANGE && this.selected.length) {
        this.menuAction = UsersActions.CHANGE_USER_ALL;
        this.$store.state.usersForm = true;
      }
      if (title === ActionsButton.CHANGE && !this.selected.length) {
        this.$store.commit(UsersMutations.SET_ERROR, {
          message: ErrorMessage.NOT_SELECTED_USER,
          openModal: true,
        });
      }
      if (title === ActionsButton.DELETE) {
        this.$store.dispatch(
          UsersActions.DELETE_USER,
          this.selected.shift()?.id
        );
      }
    },
  },
});
</script>

<style scoped></style>
