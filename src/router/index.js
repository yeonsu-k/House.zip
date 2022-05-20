import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HouseView from "../views/HouseView.vue";
import IntroView from "@/components/IntroView.vue";
import UserView from "@/views/UserView.vue";
import NoticeView from "@/views/NoticeView.vue";
import LoginForm from "@/components/LoginForm.vue";
import QnaView from "@/views/QnaView.vue";

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
    // 사용자 화면
    path: "/user",
    name: "User",
    component: UserView,
    // redirect: "/user/login",
    children: [
      {
        path: "regist",
        name: "UserRegist",
        component: () => import("@/components/user/UserRegist.vue"),
      },
      {
        path: "detail/:id",
        name: "UserDetail",
        component: () => import("@/components/user/UserDetail.vue"),
      },
    ],
  },
  {
    // 공지사항 화면
    path: "/notice",
    name: "Notice",
    component: NoticeView,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeList",
        component: () => import("@/components/notice/NoticeList.vue"),
      },
      {
        path: "regist",
        name: "NoticeRegist",
        component: () => import("@/components/notice/NoticeRegist.vue"),
      },
      {
        path: "detail/:no",
        name: "NoticeDetail",
        component: () => import("@/components/notice/NoticeDetail.vue"),
      },
      {
        path: "modify/:no",
        name: "NoticeModify",
        component: () => import("@/components/notice/NoticeModify.vue"),
      },
    ],
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
        path: "search",
        name: "HouseSearchBar",
        component: () => import("@/components/house/HouseSearchBar.vue"),
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
    // QnA 화면
    path: "/qna",
    name: "QnaView",
    component: QnaView,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: () => import("@/components/qna/QnaList.vue"),
      },
      {
        path: "regist",
        name: "QnaRegist",
        component: () => import("@/components/qna/QnaRegist.vue"),
      },
      {
        path: "detail/:no",
        name: "QnaDetail",
        component: () => import("@/components/qna/QnaDetail.vue"),
      },
      {
        path: "modify/:no",
        name: "QnaModify",
        component: () => import("@/components/qna/QnaModify.vue"),
      },
      {
        path: "ans/regist/:no",
        name: "QnaRegistAns",
        component: () => import("@/components/qna/QnaRegistAns.vue"),
      },
      {
        path: "ans/modify/:no",
        name: "QnaModifyAns",
        component: () => import("@/components/qna/QnaModifyAns.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
