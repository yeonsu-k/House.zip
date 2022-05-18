<template>
  <div>
    <h1>목록</h1>
    <div v-if="movies.length">
      <table border="1">
        <tr>
          <th>코드</th>
          <th>제목</th>
          <th>가격</th>
          <th>타입</th>
        </tr>
        <movie-list-row v-for="movie in movies" :key="movie.code" v-bind="movie"></movie-list-row>
      </table>
    </div>
    <div v-else>등록된 정보가 없습니다.</div>
    <p>
      <button @click="movieCreate">등록</button>
    </p>
  </div>
</template>

<script>
//import axios from "axios";
import http from "@/util/http-common.js";
import MovieListRow from "@/components/house/MovieListRow.vue";

export default {
  data() {
    return {
      movies: [],
    };
  },

  components: {
    MovieListRow,
  },

  methods: {
    movieCreate() {
      this.$router.push({ name: "MovieCreate" });
      //this.$router.push("/movie/create")
    },
  },
  created() {
    //axios.get("http://localhost:9090/vuemv/movie").then(({ data }) => {
    http.get("/movie").then(({ data }) => {
      this.movies = data;
    });
  },
};
</script>

<style scoped>
table {
  margin: auto;
}
</style>
