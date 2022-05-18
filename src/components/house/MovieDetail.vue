<template>
  <div>
    <h1>상세</h1>
    <div>
      코드 : {{ movie.code }}<br />
      제목 : {{ movie.title }}<br />
      가격 : {{ movie.price }}<br />
      타입 : {{ movie.name }}<br />
      <p>
        <button @click="deleteMovie">삭제</button>
        <router-link :to="{ name: 'MovieList' }">목록</router-link>
      </p>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import http from "@/util/http-common.js";
export default {
  data() {
    return {
      movie: {},
    };
  },
  created() {
    //axios.get("http://localhost:9090/vuemv/movie/" + this.$route.query.code).then(({ data }) => { //~/view?code=105
    //axios.get("http://localhost:9090/vuemv/movie/" + this.$route.params.code).then(({ data }) => {
    http.get("/movie/" + this.$route.params.code).then(({ data }) => {
      //~view/105
      this.movie = data;
    });
  },
  methods: {
    deleteMovie() {
      //axios.delete("http://localhost:9090/vuemv/movie/" + this.movie.code).then(({ data }) => {
      http.delete("/movie/" + this.movie.code).then(({ data }) => {
        let msg = "삭제 처리 시 문제가 발생했습니다.";
        if (data == "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);

        //this.$router.push("/list");
        this.$router.push({ name: "MovieList" });
      });
    },
  },
};
</script>

<style></style>
