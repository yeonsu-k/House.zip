<template>
  <div>
    <div id="head">
      <p class="text-center h1">Notice</p>
    </div>
    <div class="container my-4">
      <hr />
      <div class="mx-5">
        <b-row class="mb-3 h5">
          <b-col style="font-weight: bold">{{ notice.title }}</b-col>
        </b-row>
        <b-row>
          <b-col>
            <span>작성일 &nbsp; {{ notice.regtime }}</span>
          </b-col>
          <b-col class="text-center">
            <span>작성자 &nbsp; {{ notice.userid }}</span>
          </b-col>
          <b-col class="text-right">
            <span>조회수 &nbsp; {{ notice.hit }}</span>
          </b-col>
        </b-row>
      </div>
      <hr />
      <div class="mx-4 mt-2" style="min-height: 35vh">
        <b-row class="ml-3">
          <b-col> {{ notice.content }} </b-col>
        </b-row>
      </div>
      <hr />
      <div v-if="isManager && loginUser === notice.userid" class="text-center">
        <b-row>
          <b-col>
            <button id="bbtn" class="btn w-100" style="background-color: #48608a" :to="{ name: 'NoticeModify', params: { no: notice.no } }">수정</button>
          </b-col>
          <b-col>
            <button id="bbtn" class="btn w-100" style="background-color: #48608a" @click="deleteNotice">삭제</button>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NoticeDetail",
  props: {
    loginUser: null,
    isManager: null,
  },
  data() {
    return {
      notice: {
        no: "",
        title: "",
        content: "",
        regtime: "",
        userid: "",
        hit: "",
      },
    };
  },
  methods: {
    deleteNotice() {
      this.$emit("delete-notice", this.notice);
    },
  },
  created() {
    if (!this.loginUser) {
      alert("로그인이 필요합니다.");
      this.$router.push("/login");
      return;
    }
    axios.get("http://localhost:8080/happyhouse/notice/" + this.$route.params.no).then(({ data }) => {
      this.notice = data;
    });
  },
};
</script>

<style scoped>
#head {
  background-color: #48608a;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vh;
  color: lightcyan;
}
/* 버튼색 추천 :  #ece6cc , #637DB0 , #48608a , #506e80 */
#head p {
  font-weight: bold;
}

#bbtn {
  color: white;
}
</style>
