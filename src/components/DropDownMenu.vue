<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Действия</v-btn>
    </template>
    <v-list v-for="(item, index) in actions" :key="index">
      <v-list-item-title @click="handleClick(item.title)">
        <v-btn density="compact" text width="100%">{{ item.title }}</v-btn>
      </v-list-item-title>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DropDownMenu",
  props: {
    actions: { type: Array },
  },
  methods: {
    handleClick(title: string) {
      this.$emit("update:onClick", title);
    },
  },
});
</script>
