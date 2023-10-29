import Vue from "vue";
import VueRouter from "vue-router";
import { PathName, ProfileStatus } from "@/helpers/types/enums";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: PathName.MAIN,
      name: ProfileStatus.ALL,
      meta: { layout: "main" },
      component: () => import("@/views/AllMain.vue"),
    },
    {
      path: PathName.COMPLETED,
      name: ProfileStatus.PROCESSED,
      meta: { layout: "main" },
      component: () => import("@/views/AllMain.vue"),
    },
    {
      path: PathName.FAILED,
      name: ProfileStatus.RAW,
      meta: { layout: "main" },
      component: () => import("@/views/AllMain.vue"),
    },
  ],
});

export default router;
