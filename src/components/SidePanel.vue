<template>
  <v-expansion-panels multiple :value="panelExpanded">
    <v-expansion-panel>
      <v-expansion-panel-header expand-icon="mdi-menu-down">
        Профили
      </v-expansion-panel-header>
      <v-expansion-panel-content v-for="(link, index) in links" :key="link.url">
        <v-icon
          color="index !== links.length - 1 ? 'primary' : 'error'"
          :icon="
            index !== links.length - 1 ? 'mdi-check-circle' : 'mdi-alert-circle'
          "
        >
          {{
            index !== links.length - 1 ? "mdi-check-circle" : "mdi-alert-circle"
          }}
        </v-icon>
        <router-link :to="link.url">{{ link.title }}</router-link>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { PathName, ProfileStatus } from "@/helpers/types/enums";

export default {
  name: "SidePanel",
  data() {
    return {
      panelExpanded: [0, 1, 2],
      links: [
        {
          title: ProfileStatus.ALL,
          url: PathName.MAIN,
          exact: true,
        },
        {
          title: ProfileStatus.PROCESSED,
          url: PathName.COMPLETED,
        },
        {
          title: ProfileStatus.RAW,
          url: PathName.FAILED,
        },
      ],
    };
  },
};
</script>

<style scoped></style>
