import * as VueRouter from "vue-router";
import Main from "../view/Main.vue"
import Edit from "../view/Edit.vue"

export default VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit,
    },
    // {
    //   path: "/:pathMatch(.*)",
    //   redirect: "/",
    // },
  ],
});
