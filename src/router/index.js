import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HouseView from "../views/HouseView.vue";
import LoginForm from "@/components/LoginForm.vue";
import IntroView from "@/components/IntroView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    // Intro 화면
    path: "/intro",
    name: "Intro",
    component: IntroView,
  },
  {
    // 로그인 화면
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    //거래 조회
    path: "/house",
    name: "house",
    component: HouseView,
    redirect: "/house/all",
    children: [
      {
        path: "all",
        name: "HouseAll",
        component: () => import("@/components/house/HouseAll.vue"),
      },
      {
        path: "apt",
        name: "HouseApt",
        //component: () => import("@/components/house/MovieCreate.vue"),
      },
      {
        path: "dong",
        name: "HouseDong",
        //component: () => import("@/components/house/MovieCreate.vue"),
      },
      {
        path: "detail/:code",
        name: "MovieDetail",
        //component: () => import("@/components/house/MovieDetail.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
