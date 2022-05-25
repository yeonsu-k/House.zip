<template>
  <label for="chk">
    <input id="chk" type="checkbox" :value="checked" @input="$emit('input', !checked)" />
    <span class="check" :class="{ on: check }"></span>
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "CheckboxView",
  props: {
    checked: {
      type: Boolean,
      default: true,
    },
    label: String,
  },
  model: {
    prop: "checked",
    event: "input",
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}

span.check {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url("http://drive.google.com/uc?export=view&id=1fTg0Xop_1pBwKNxGnEPSr2jZwu3h61Yt") no-repeat;
  background-size: 100%;
}

span.check.on {
  background: url("http://drive.google.com/uc?export=view&id=1BJm09kQRgh6PgiiOtP5eAoyHMF9vneOu") no-repeat;
  background-size: 100%;
}
</style>
