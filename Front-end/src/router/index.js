import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HouseView from "../views/HouseView.vue";
import UserView from "@/views/UserView.vue";
import NoticeView from "@/views/NoticeView.vue";
import LoginForm from "@/components/LoginForm.vue";
import FindPWForm from "@/components/FindPWForm.vue";
import QnaView from "@/views/QnaView.vue";
import MypageView from "@/views/MypageView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    // 로그인 화면
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    // 비밀번호 찾기 화면
    path: "/findpwd",
    name: "FindPW",
    component: FindPWForm,
  },
  {
    // 사용자 화면
    path: "/user",
    name: "User",
    component: UserView,
    children: [
      {
        path: "regist",
        name: "UserRegist",
        component: () => import("@/components/user/UserRegist.vue"),
      },
    ],
  },
  {
    // 마이페이지 화면
    path: "/my",
    name: "Mypage",
    component: MypageView,
    redirect: "/my/detail/:id",
    children: [
      {
        path: "detail/:id",
        name: "UserDetail",
        component: () => import("@/components/my/UserDetail.vue"),
      },
      {
        path: "interest/:id",
        name: "MyInterest",
        component: () => import("@/components/my/MyInterest.vue"),
      },
      {
        path: "qna/:id",
        name: "MyQna",
        component: () => import("@/components/my/MyQna.vue"),
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
        path: "deallist/:aptCode",
        name: "HouseDealList",
        component: () => import("@/components/house/HouseDealList.vue"),
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
