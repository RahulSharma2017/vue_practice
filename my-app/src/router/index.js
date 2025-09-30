import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/login.vue";
import Dashboard from "../components/dashboard.vue";
import Scheduler from "../components/scheduler.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/scheduler", component: Scheduler },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;