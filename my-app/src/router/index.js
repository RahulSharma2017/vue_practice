import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/auth.vue";
import Dashboard from "../components/dashboard.vue";
import scheduler from "../components/scheduler.vue";


const routes = [
  { path: "/", name: "Auth", component: Auth },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  {path: "/scheduler", name:"scheduler", component: scheduler},
];
export default createRouter({
  history: createWebHistory(),
  routes,
});