<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import FormUser from "@/components/FormUser.vue";
import ErrorModal from "@/components/ErrorModal.vue";

export default defineComponent({
  components: { ErrorModal, FormUser, MainLayout },

  computed: {
    layout() {
      return (this.$route.meta?.layout || "main") + "-layout";
    },
  },
});
</script>

<template>
  <v-app id="app">
    <component :is="layout">
      <router-view />
    </component>
    <ErrorModal />
  </v-app>
</template>
