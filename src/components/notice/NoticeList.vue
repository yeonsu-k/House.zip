<template>
  <div class="container">
    <span style="font-size: 35px">공시사항 목록</span>
    <b-button v-if="isManager" variant="outline-success" style="float: right; width: auto" to="/notice/regist">글쓰기</b-button>
    <hr />
    <div class="text-right">
      <small class="mb-3 text-right">* 전체 공지사항 수 : {{ noticeCnt }} </small>
    </div>
    <div v-if="notices.length">
      <b-table-simple hover striped responsive class="text-center">
        <b-thead>
          <b-tr>
            <b-th>번호</b-th>
            <b-th>제목</b-th>
            <b-th>시간</b-th>
            <b-th>아이디</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(notice, index) in notices" :key="index">
            <b-td>{{ index + 1 }}</b-td>
            <b-td>
              <router-link class="notice-link" :to="{ name: 'NoticeDetail', params: { no: notice.no } }">{{ notice.title }}</router-link>
            </b-td>
            <b-td>{{ notice.regtime }}</b-td>
            <b-td>{{ notice.userid }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div v-else>등록된 공지사항이 없습니다.</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NoticeList",
  props: {
    loginUser: null,
    isManager: null,
  },
  data() {
    return {
      notices: {
        type: Array,
      },
    };
  },
  methods: {},
  computed: {
    noticeCnt() {
      return this.notices.length;
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/notice/").then(({ data }) => {
      this.notices = data;
    });
  },
};
</script>
