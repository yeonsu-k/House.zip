<template>
  <div class="container">
    <span style="font-size: 35px">공시사항 목록</span>
    <b-button variant="outline-success" style="float: right; width: auto" to="/notice/regist">글쓰기</b-button>
    <hr />
    <h4 class="mt-3">등록된 공지사항 수 : {{ noticeCnt }}</h4>
    <div v-if="notices.length">
      <table class="notice-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 35%" />
          <col style="width: 30%" />
          <col style="width: 25%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>시간</th>
            <th>아이디</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notice, index) in notices" :key="index">
            <td>{{ notice.no }}</td>
            <td>
              <router-link class="notice-link" :to="{ name: 'NoticeDetail', params: { no: notice.no } }">{{ notice.title }}</router-link>
            </td>
            <td>{{ notice.regtime }}</td>
            <td>{{ notice.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>등록된 공지사항이 없습니다.</div>
  </div>
</template>
<script>
export default {
  name: "NoticeList",
  props: {
    notices: {
      type: Array,
    },
  },
  methods: {},
  computed: {
    noticeCnt() {
      return this.notices.length;
    },
  },
};
</script>
