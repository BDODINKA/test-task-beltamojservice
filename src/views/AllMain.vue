<template>
  <v-container v-if="loading">
    <v-progress-circular indeterminate class="spinner" />
  </v-container>
  <TableUsers v-else :title="urlWatcher" :init-values="users" />
</template>

<script lang="ts">
import TableUsers from "@/components/TableUsers.vue";
import { defineComponent } from "vue";
import type { UserDataType } from "@/helpers/types/types";
import { UsersActions } from "@/helpers/types/enums";

export default defineComponent({
  name: "MainPage",
  components: { TableUsers },

  computed: {
    users(): UserDataType[] {
      return this.$store.state.users;
    },
    urlWatcher() {
      return this.$route.name;
    },
    loading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch(UsersActions.FETCH_DATA);
    },
  },

  mounted() {
    this.fetchData();
  },
});
</script>

<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
