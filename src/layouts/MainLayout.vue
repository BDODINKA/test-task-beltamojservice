<template>
  <v-container fluid :class="'container'">
    <VHeader :class="'header'" />
    <SidePanel :class="'side-panel'" />
    <router-view :class="'slot'" />
  </v-container>
</template>

<script>
import SidePanel from "@/components/SidePanel.vue";
import VHeader from "@/components/VHeader.vue";

export default {
  name: "MainLayout",
  components: { VHeader, SidePanel },
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 0;
  padding: 0;
}

.header {
  grid-area: 1 / 1 / 2 / 6;
}

.side-panel {
  grid-area: 2 / 1 / 5 / 2;
}

.slot {
  grid-area: 2 / 2 / 5 / 6;
}
</style>
