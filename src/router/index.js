import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HouseView from "../views/HouseView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/movie",
    name: "Movie",
    component: HouseView,
    redirect: "/movie/list",
    children: [
      {
        path: "list",
        name: "MovieList",
        component: () => import(/* webpackChunkName: "about" */ "@/components/house/MovieList.vue"),
      },
      {
        path: "create",
        name: "MovieCreate",
        component: () => import(/* webpackChunkName: "about" */ "@/components/house/MovieCreate.vue"),
      },
      {
        path: "detail/:code",
        name: "MovieDetail",
        component: () => import(/* webpackChunkName: "about" */ "@/components/house/MovieDetail.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
