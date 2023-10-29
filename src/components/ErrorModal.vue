<template>
  <v-dialog
    :value="showModalError"
    @click:outside="openErrorModal"
    max-width="500"
  >
    <v-card class="card-content">
      <v-card-text class="card-text">{{ errorMessage }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorModal",
  computed: {
    showModalError() {
      return this.$store.state.showErrorModal;
    },
    errorMessage() {
      return this.$store.state.errorMessage;
    },
  },
  methods: {
    openErrorModal() {
      this.$store.state.showErrorModal = !this.showModalError;
    },
  },
};
</script>

<style scoped>
.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.card-text {
  width: auto;
  color: red !important;
}
</style>
