<template>
  <v-app-bar color="primary" clipped-right>
    <v-btn density="compact" icon>
      <v-icon color="white">mdi-menu</v-icon>
    </v-btn>
    <v-spacer />
    <v-row justify="end" align="center">
      <SearchForm v-if="showModal" />
    </v-row>
    <v-spacer />
    <v-btn density="compact" icon @click="openModal">
      <v-icon v-if="!showModal" color="white">mdi-magnify</v-icon>
      <v-icon v-else color="white">mdi-close</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";

export default {
  name: "VHeader",
  components: { SearchForm },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style scoped></style>
