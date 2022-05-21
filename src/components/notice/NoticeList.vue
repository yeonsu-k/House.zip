<template>
  <div class="container">
    <span style="font-size: 35px">공시사항 목록</span>
    <b-button v-if="isManager" variant="outline-success" style="float: right; width: auto" to="/notice/regist">글쓰기</b-button>
    <hr />
    <div class="text-right">
      <b-row>
        <b-col cols="8"></b-col>
        <b-col cols="2"><b-form-select v-model="selected" :options="options" size="sm" class="mt-3" @change="sort"></b-form-select></b-col>
        <b-col align-self="end" cols="2">
          <small class="mb-3 text-right">* 전체 공지사항 수 : {{ noticeCnt }} </small>
        </b-col>
      </b-row>
    </div>
    <div v-if="notices.length">
      <b-table-simple hover striped responsive class="text-center">
        <b-thead>
          <b-tr>
            <b-th>번호</b-th>
            <b-th>제목</b-th>
            <b-th>시간</b-th>
            <b-th>아이디</b-th>
            <b-th>조회수</b-th>
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
            <b-td>{{ notice.hit }}</b-td>
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
      selected: "최신순",
      options: [
        { value: "최신순", text: "최신순" },
        { value: "오래된순", text: "오래된순" },
        { value: "제목순", text: "제목순" },
        { value: "조회수순", text: "조회수순" },
      ],
      notices: {
        type: Array,
      },
    };
  },
  methods: {
    sort() {
      let sortCal = "regtime";
      let sortVal = "desc";

      switch (this.selected) {
        case "오래된순":
          sortVal = "asc";
          break;
        case "제목순":
          sortCal = "title";
          sortVal = "asc";
          break;
        case "조회수순":
          sortCal = "hit";
          // sortVal = "desc";
          break;
      }
      axios.get("http://localhost:8080/happyhouse/notice/", { params: { sortCal, sortVal } }).then(({ data }) => {
        this.notices = data;
      });
    },
  },
  computed: {
    noticeCnt() {
      return this.notices.length;
    },
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/notice/", { params: { sortCal: "regtime", sortVal: "desc" } }).then(({ data }) => {
      this.notices = data;
    });
  },
};
</script>
