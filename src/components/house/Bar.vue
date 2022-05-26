<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import axios from "axios";
import { Bar } from "vue-chartjs/legacy";

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    avgdeal: null,
    dongcode: null,
    aptName: null,
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    axios.get("http://localhost:8080/happyhouse/house/avg/" + this.dongcode).then(({ data }) => {
      this.avgs = data;
      // console.log(this.avgs.sido[0].dealAmount);
      // console.log(this.avgs.dong[0].dealAmount);
      // console.log(this.avgdeal[0]);
      // console.log(this.avgs.sido[1].rentMoney);
      // console.log(this.avgs.sido[1].rentMoney);
      // console.log(this.avgdeal[2]);
      // console.log(this.avgs.sido[2].rentMoney);
      // console.log(this.avgs.sido[2].rentMoney);
      // console.log(this.avgdeal[1]);

      this.chartData.datasets = [
        {
          label: "매매",
          backgroundColor: "#f87979",
          data: [parseInt(this.avgs.sido[0].dealAmount), parseInt(this.avgs.dong[0].dealAmount), parseInt(this.avgdeal[0])],
        },
        {
          label: "전세",
          backgroundColor: "#FAE3A8",
          data: [parseInt(this.avgs.sido[1].rentMoney), parseInt(this.avgs.dong[1].rentMoney), parseInt(this.avgdeal[2])],
        },
        {
          label: "월세(보증금)",
          backgroundColor: "#8EABFA",
          data: [parseInt(this.avgs.sido[2].rentMoney), parseInt(this.avgs.dong[2].rentMoney), parseInt(this.avgdeal[1])],
        },
      ];
      // this.chartData.datasets.data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.chartData.labels = ["시도 평균", "동 평균", this.aptName + " 평균"];
      //매매 전세 월세
    });
  },
};
</script>
