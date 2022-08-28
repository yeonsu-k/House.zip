<template>
  <b-row class="mr-2 my-3 text-center">
    <b-col>
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList">
        <template #first>
          <b-form-select-option :value="null" disabled>시도를 선택하세요</b-form-select-option>
        </template>
      </b-form-select>
    </b-col>
    <b-col>
      <b-form-select v-model="gugunCode" :options="guguns" @change="searchApt">
        <template #first>
          <b-form-select-option :value="null" disabled>구군을 선택하세요</b-form-select-option>
        </template>
      </b-form-select>
    </b-col>
  </b-row>
</template>
<script>
import axios from "axios";
export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      sidos: [],
      guguns: [],
      houses: [],
      checkGugun: null,
    };
  },
  props: {
    loginId: null,
  },
  created() {
    this.clearSido();
    this.getSido();

    if (this.loginId) {
      axios
        .get("/housezip/user/inter/" + this.loginId, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset = utf-8",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then(({ data }) => {
          this.sidoCode = data.interestSidoCode;
          this.checkGugun = data.interestGugunCode;
          this.gugunList();
        })
        .catch(({ error }) => {
          alert("처리 중 문제가 생겼습니다. 다시 로그인 해주세요");
          this.$emit("logout");
        });
    }
  },
  methods: {
    getSido() {
      axios.get("http://localhost:8080/housezip/house/list/sido").then(({ data }) => {
        this.sidos = data.map((category) => ({ value: category.sidoCode, text: category.sidoName }));
      });
    },
    getGugun() {
      if (this.sidoCode) {
        axios.get("http://localhost:8080/housezip/house/list/gugun/" + this.sidoCode).then(({ data }) => {
          this.guguns = data.map((category) => ({ value: category.gugunCode, text: category.gugunName }));
          if (this.checkGugun) {
            this.gugunCode = this.checkGugun;
            this.checkGugun = null;
            this.searchApt();
          }
        });
      }
    },
    clearSido() {
      this.sidos = [];
    },
    gugunList() {
      console.log(this.sidoCode);
      this.guguns = [];
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      if (this.gugunCode) this.$emit("search-apt", this.gugunCode);
    },
  },
};
</script>

<style></style>
