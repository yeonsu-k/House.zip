<template>
  <b-row class="mt-4 mb-4 text-center">
    <b-col class="sm-3">
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList">
        <template #first>
          <b-form-select-option :value="null" disabled>선택하세요</b-form-select-option>
        </template>
      </b-form-select>
    </b-col>
    <b-col class="sm-3">
      <b-form-select v-model="gugunCode" :options="guguns" @change="searchApt">
        <template #first>
          <b-form-select-option :value="null" disabled>선택하세요</b-form-select-option>
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
    };
  },
  created() {
    this.clearSido();
    this.getSido();
  },
  methods: {
    getSido() {
      axios.get("http://localhost:8080/happyhouse/house/list/sido").then(({ data }) => {
        this.sidos = data.map((category) => ({ value: category.sidoCode, text: category.sidoName }));
      });
    },
    getGugun() {
      if (this.sidoCode) {
        axios.get("http://localhost:8080/happyhouse/house/list/gugun/" + this.sidoCode).then(({ data }) => {
          this.guguns = data.map((category) => ({ value: category.gugunCode, text: category.gugunName }));
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
