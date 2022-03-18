import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/info",
      name: "info",
      component: () => import("../views/info/index.vue"),
    },
    {
      path: "/charts",
      name: "charts",
      component: () => import("../views/charts/index.vue"),
    },
  ],
});

export default router;
