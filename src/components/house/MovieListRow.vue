<template>
  <tr>
    <td>{{ code }}</td>
    <td>
      <!--<router-link :to="'/movie/detail/?code=' + code">{{ title }}</router-link>-->
      <!--<router-link :to="'/movie/detail/' + code">{{ title }}</router-link>-->
      <router-link :to="{ name: 'MovieDetail', params: { code: code } }">{{ title }}</router-link>
    </td>
    <td>{{ price }}</td>
    <td>{{ name }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    code: String,
    title: String,
    price: Number,
    name: String,
  },
};
</script>

<style></style>
