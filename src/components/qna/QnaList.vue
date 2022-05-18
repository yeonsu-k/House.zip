<template>
  <div class="container">
    <h2>QnA 목록</h2>
    <b-button variant="outline-success" to="/qna/regist">문의하기</b-button>
    <h4>등록된 QnA 수 : {{ qnaCnt }}</h4>
    <div v-if="qnas.length">
      <table class="qna-list">
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
            <th>날짜</th>
            <th>아이디</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(qna, index) in qnas" :key="index">
            <td>{{ qna.no }}</td>
            <td>
              <router-link class="qna-link" :to="{ name: 'QnaDetail', params: { no: qna.no } }">{{ qna.title }}</router-link>
            </td>
            <td>{{ qna.asktime }}</td>
            <td>{{ qna.userid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>등록된 QnA가 없습니다.</div>
  </div>
</template>
<script>
export default {
  name: "QnaList",
  props: {
    qnas: {
      type: Array,
    },
  },
  methods: {},
  computed: {
    qnaCnt() {
      return this.qnas.length;
    },
  },
};
</script>

<style scoped>
.jumbotron {
  background-image: url("@/assets/login-bg.jpg");
  background-position: center;
  background-size: fill;
  height: 40vh;
  text-align: center;
}
.jumbotron > div {
  width: 70%;
  height: 40vh;
  display: inline-block;
}
</style>
