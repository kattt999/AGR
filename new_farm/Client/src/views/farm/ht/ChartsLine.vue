<template>
  <div ref="dom" class="charts-line" />
</template>

<script>
import echarts from "echarts";
import _ from "lodash";
import dayjs from "dayjs";


export default {
  name: "ChartsLine",
  props: {
    title: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      dom: null,
    };
  },
  watch: {
    data(val, oldVal) { 
      this.drawing()
    },
  },
  mounted() {
    this.drawing();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    drawing() {
      var _datax = [];
      var _datay = [];
      _(this.data).forEach(function (value) {
        _datax.push(dayjs(value.ddatetime).format("YYYY-MM-DD HH:mm"));
        _datay.push(value.h);
      });  
      var option = {
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["湿度"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: _datax,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "湿度",
            type: "line",
            stack: "总量",
            data: _datay,
          },
        ],
      };
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      window.addEventListener("resize", this.resize);
    },
  },
};
</script>

<style lang="less">
</style>
