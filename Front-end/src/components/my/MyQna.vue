<template>
  <div class="container">
    <b-container>
      <div>
        <b-row align-h="between" align-v="end" class="mb-2">
          <b-col>
            <h4 style="font-weight: bold">나의 질문</h4>
            <hr />
          </b-col>
        </b-row>
      </div>
      <div id="scrollView">
        <div v-if="qnas.length">
          <b-table-simple hover sticky-header class="text-center">
            <colgroup>
              <col :style="{ width: '10%' }" />
              <col :style="{ width: '38%' }" />
              <col :style="{ width: '12%' }" />
              <col :style="{ width: '10%' }" />
              <col :style="{ width: '10%' }" />
            </colgroup>
            <b-thead head-variant="light">
              <b-tr>
                <b-th>#</b-th>
                <b-th>제목</b-th>
                <b-th>날짜</b-th>
                <b-th>조회수</b-th>
                <b-th>상태</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(qna, index) in qnas" :key="index">
                <b-td>{{ no - pageLimit + index + 1 }}</b-td>
                <b-td>
                  <router-link class="qna-link" :to="{ name: 'QnaDetail', params: { no: qna.no } }">{{ qna.title }}</router-link>
                </b-td>
                <b-td>{{ qna.asktime.substring(0, 10) }}</b-td>
                <b-td>{{ qna.hit }}</b-td>
                <b-td v-if="qna.masterid" style="color: darkred; font-weight: bold">완료</b-td>
                <b-td v-else>대기</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>
        <div v-else>등록된 QnA가 없습니다.</div>
      </div>
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "MyQna",

  props: {
    loginId: null,
  },
  data() {
    return {
      qnas: {
        type: Array,
      },
      status: false,
      no: 10,
      pageLimit: 10,
      pageOffet: 0,
      total: 0,
      isManager: false,
    };
  },
  methods: {
    initComponent() {
      if (this.status) {
        axios
          .get("http://localhost:8080/housezip/qna/my/ans", {
            params: { userid: this.loginId, limit: this.pageLimit, offset: this.no - this.pageLimit },
          })
          .then(({ data }) => {
            this.qnas = data;
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      } else {
        axios
          .get("http://localhost:8080/housezip/qna/my", {
            params: { userid: this.loginId, limit: this.pageLimit, offset: this.no - this.pageLimit },
          })
          .then(({ data }) => {
            this.qnas = data;
          })
          .catch(() => {
            alert("에러가 발생했습니다.");
          });
      }
    },
  },

  computed: {
    qnaCnt() {
      return this.qnas.length;
    },
  },

  created() {
    this.initComponent();
    this.isManager = JSON.parse(localStorage.getItem("isManager"));
  },
};
</script>

<style scoped>
.b-table-sticky-header {
  overflow-y: auto;
  max-height: 500px;
}
.b-table-sticky-header::-webkit-scrollbar {
  display: none;
}
</style>
