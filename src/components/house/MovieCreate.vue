<template>
  <div>
    <h1>등록</h1>
    <div>
      코드 : <input type="text" v-model="code" value="104" /><br />
      제목 : <input type="text" v-model="title" value="국가대표" /><br />
      가격 : <input type="text" v-model="price" value="5000" /><br />
      타입 :
      <select v-model="no">
        <option v-for="(type, index) in types" :key="index" :value="type.no">{{ type.name }}</option>
      </select>
      <p>
        <button @click="createMovie">등록</button>
        <button @click="movieList">목록</button>
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
      code: "104",
      title: "국가대표",
      price: 5000,
      no: "dr",
      types: [
        { no: "co", name: "코미디" },
        { no: "dr", name: "드라마" },
        { no: "sf", name: "판타니" },
      ],
    };
  },

  methods: {
    createMovie() {
      //axios.post("http://localhost:9090/vuemv/movie", {
      http
        .post("/movie", {
          code: this.code,
          title: this.title,
          price: this.price,
          no: this.no,
        })
        .then(({ data }) => {
          let msg = "등록 처리 시 문제가 발생했습니다.";
          if (data == "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.movieList();
        });
    },
    movieList() {
      //this.$router.push("/list");
      this.$router.push({ name: "MovieList" });
    },
  },
};
</script>

<style></style>
