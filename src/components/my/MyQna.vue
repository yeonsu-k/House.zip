<template>
  <div class="container">
    <h2>관심매물</h2>
    <b-form-group label="아이디" label-for="input-id">
      <b-form-input id="input-id" v-model="user.id" placeholder="Enter id" readonly></b-form-input>
    </b-form-group>
    <form>
      <b-form-group label="비밀번호" label-for="input-password">
        <b-form-input id="input-password" type="password" v-model="user.password" placeholder="Enter password"></b-form-input>
      </b-form-group>
    </form>
    <b-form-group label="이름" label-for="input-name">
      <b-form-input id="input-name" v-model="user.name" placeholder="Enter name"></b-form-input>
    </b-form-group>
    <b-form-group label="이메일" label-for="input-email">
      <b-form-input id="input-email" type="email" v-model="user.email" placeholder="Enter email"></b-form-input>
    </b-form-group>
    <b-form-group label="전화번호" label-for="input-tel">
      <b-form-input id="input-tel" v-model="user.tel" placeholder="Enter tel"></b-form-input>
    </b-form-group>

    <div role="group" class="mt-2">
      <label for="input-tel">관심지역</label>
      <b-row class="ml-2 mr-2 mb-2 my-1 text-center">
        <b-col class="sm-3">
          <b-form-select size="sm" v-model="sidoCode" :options="sidos" @change="gugunList">
            <b-form-select-option :value="null" disabled>시도를 선택하세요</b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col class="sm-3">
          <b-form-select size="sm" v-model="gugunCode" :options="guguns">
            <b-form-select-option :value="null" disabled>구군을 선택하세요</b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
    </div>
    <div>관심사</div>
    <div id="input-cate" class="mt-2">
      <span class="mr-3" v-for="(option, index) in options" :key="index">
        <input type="checkbox" :id="option.text" :options="options" v-model="option.checked" />
        <label :for="option.text"> {{ option.text }}</label>
      </span>
    </div>
    <b-form-text id="input-live-help-name">매물을 볼 때 중요하게 생각하는 시설을 선택해주세요 (다중선택가능)</b-form-text>
    <b-button variant="outline-success" class="btn" @click="updateUser">수정</b-button>
    <b-button v-if="!isManager" variant="outline-success" class="btn" @click="deleteUser">삭제</b-button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "UserDetail",
  props: {
    loginId: null,
  },
  data() {
    return {};
  },
  methods: {
    isManager() {
      return localStorage.getItem("isManager");
    },
  },
};
</script>
