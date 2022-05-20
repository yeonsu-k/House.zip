<template>
  <div class="container">
    <span style="font-size: 35px">상세보기</span>
    <hr />
    <!-- <b-container class="bv-example-row mb-3">
      <b-row align-v class="border" cols="2">
        <b-col class="col"> {{ notice.content }} </b-col>
        <b-col class="col text-right"
          ><small> {{ notice.regtime }} </small></b-col
        >
      </b-row>
    </b-container> -->

    <b-table-simple class="mt-2 table-bordered text-center" style="min-height: 400px">
      <b-thead class="table-secondary">
        <b-tr>
          <b-th width="auto">제목</b-th>
          <b-th style="width: 50ch">{{ notice.title }}</b-th>
          <b-th width="auto">날짜</b-th>
          <b-th>{{ notice.regtime }}</b-th>
          <b-th width="auto">작성자</b-th>
          <b-th>{{ notice.userid }}</b-th>
          <b-th width="auto">조회수</b-th>
          <b-th>{{ notice.hit }}</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <!-- <b-td style="vertical-align: middle">내용</b-td> -->
          <b-td colspan="8" style="text-align: left">{{ notice.content }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <div v-if="isManager && loginUser === notice.userid" class="text-center">
      <b-button variant="outline-success" class="btn" style="width: 48%" :to="{ name: 'NoticeModify', params: { no: notice.no } }">수정</b-button>
      <b-button variant="outline-success" class="btn" style="width: 48%" @click="deleteNotice">삭제</b-button>
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
