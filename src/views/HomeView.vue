<template>
  <div class="home">
    <!-- Header-->
    <b-jumbotron>
      <div>
        <h1 class="font-weight-bold display-4">Happy House</h1>
        <hr />
        <span style="font-size: 25px"><h4>welcome to house</h4></span>
      </div>
    </b-jumbotron>
    <!-- Main Content-->
    <div class="container mb-4">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-8 col-xl-7"></div>
      </div>
      <b-card-group deck>
        <b-card header="부동산 관련 최신 뉴스">
          <b-list-group>
            <b-list-group-item v-for="(news, index) in newslist" :key="index" :href="news.url" target="_blank" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ news.title }}</h5>
                <small class="text-muted">{{ news.time }}</small>
              </div>
              <p class="mb-1 mt-2">
                {{ news.content }}
              </p>
              <small class="text-muted">뉴스 기사로 이동하기</small>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  props: {
    user: null,
  },
  data() {
    return {
      newslist: {
        type: Array,
      },
      //     loginUser: "",
      //     isManager: "",
    };
  },
  // methods: {
  //   createNotice(notice) {
  //     axios
  //       .post("http://localhost:8080/happyhouse/notice/", {
  //         no: notice.no,
  //         title: notice.title,
  //         content: notice.content,
  //         regtime: notice.regtime,
  //         userid: notice.userid,
  //       })
  //       .then(({ data }) => {
  //         let msg = "등록 처리시 문제가 발생했습니다.";
  //         if (data == "success") {
  //           msg = "등록이 완료되었습니다.";
  //         }
  //         alert(msg);
  //         // this.$router.push({ name: "NoticeView" });
  //         this.$router.push("/notice");
  //       });
  //   },
  //   updateNotice(notice) {
  //     axios
  //       .put("http://localhost:8080/happyhouse/notice/" + notice.no, {
  //         title: notice.title,
  //         content: notice.content,
  //         no: notice.no,
  //       })
  //       .then(({ data }) => {
  //         let msg = "수정 처리시 문제가 발생했습니다.";
  //         if (data == "success") {
  //           msg = "수정이 완료되었습니다.";
  //         }
  //         alert(msg);
  //         this.$router.push("/notice");
  //       });
  //   },
  //   deleteNotice(notice) {
  //     axios.delete("http://localhost:8080/happyhouse/notice/" + notice.no).then(({ data }) => {
  //       let msg = "삭제 처리시 문제가 발생했습니다.";
  //       if (data == "success") {
  //         msg = "삭제가 완료되었습니다.";
  //       }
  //       alert(msg);
  //       // this.$router.push({ name: "NoticeView" });
  //       this.$router.push("/notice");
  //     });
  //   },
  // },
  created() {
    axios.get("http://localhost:8080/happyhouse/crawling/").then(({ data }) => {
      this.newslist = data;
    });
    // if (this.user) {
    //   this.loginUser = this.user.id;
    //   this.isManager = this.user.manager;
    // } else {
    //   this.loginUser = null;
    //   this.isManager = null;
    // }
  },
};
</script>

<style scoped>
.jumbotron {
  height: 40vh;
  text-align: center;
  position: relative;
  z-index: 1;
}
.jumbotron::after {
  width: 100%;
  height: 100%;
  content: "";
  background: url("@/assets/home-bg.jpg");
  background-position: center;
  background-size: fill;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.65;
}
.jumbotron > div {
  width: 70%;
  display: inline-block;
}
</style>
