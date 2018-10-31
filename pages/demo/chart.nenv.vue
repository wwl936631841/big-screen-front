<template>
    <nv-layout>
        <div slot="top">
            <a href="http://echarts.baidu.com/examples/" target="_blank"> 更多示例 请参考echart 官网</a>
        </div>
        <nv-layout-section title="柱状图">
            <e-charts :options="bar"></e-charts>
        </nv-layout-section>
        <nv-layout-section title="饼图">
            <e-charts :options="pie"></e-charts>
        </nv-layout-section>
        <nv-layout-section title="折线图">
            <e-charts :options="line"></e-charts>
        </nv-layout-section>
        <nv-layout-section title="雷达图">
            <e-charts :options="radar"></e-charts>
        </nv-layout-section>
        <nv-layout-section title="极坐标图">
            <e-charts :options="polar"></e-charts>
        </nv-layout-section>
    </nv-layout>
</template>
<script>
export default {
  name: "DemoChart",
  data() {
    return {
      // 柱状图
      bar: {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "2015", "2016", "2017"],
          source: [
            {
              product: "Matcha Latte",
              "2015": 43.3,
              "2016": 85.8,
              "2017": 93.7
            },
            { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
            {
              product: "Cheese Cocoa",
              "2015": 86.4,
              "2016": 65.2,
              "2017": 82.5
            },
            {
              product: "Walnut Brownie",
              "2015": 72.4,
              "2016": 53.9,
              "2017": 39.1
            }
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      },
      // 饼图
      pie: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: [
            "直达",
            "营销广告",
            "搜索引擎",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直达", selected: true },
              { value: 679, name: "营销广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              normal: {
                formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]
          }
        ]
      },
      // 折线图
      line: {
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      // 雷达图
      radar: {
        title: {
          text: "多雷达图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          x: "center",
          data: ["某软件", "某主食手机", "某水果手机", "降水量", "蒸发量"]
        },
        radar: [
          {
            indicator: [
              { text: "品牌", max: 100 },
              { text: "内容", max: 100 },
              { text: "可用性", max: 100 },
              { text: "功能", max: 100 }
            ],
            center: ["25%", "40%"],
            radius: 80
          },
          {
            indicator: [
              { text: "外观", max: 100 },
              { text: "拍照", max: 100 },
              { text: "系统", max: 100 },
              { text: "性能", max: 100 },
              { text: "屏幕", max: 100 }
            ],
            radius: 80,
            center: ["50%", "60%"]
          },
          {
            indicator: (function() {
              var res = [];
              for (var i = 1; i <= 12; i++) {
                res.push({ text: i + "月", max: 100 });
              }
              return res;
            })(),
            center: ["75%", "40%"],
            radius: 80
          }
        ],
        series: [
          {
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                value: [60, 73, 85, 40],
                name: "某软件"
              }
            ]
          },
          {
            type: "radar",
            radarIndex: 1,
            data: [
              {
                value: [85, 90, 90, 95, 95],
                name: "某主食手机"
              },
              {
                value: [95, 80, 95, 90, 93],
                name: "某水果手机"
              }
            ]
          },
          {
            type: "radar",
            radarIndex: 2,
            itemStyle: { normal: { areaStyle: { type: "default" } } },
            data: [
              {
                name: "降水量",
                value: [
                  2.6,
                  5.9,
                  9.0,
                  26.4,
                  28.7,
                  70.7,
                  75.6,
                  82.2,
                  48.7,
                  18.8,
                  6.0,
                  2.3
                ]
              },
              {
                name: "蒸发量",
                value: [
                  2.0,
                  4.9,
                  7.0,
                  23.2,
                  25.6,
                  76.7,
                  35.6,
                  62.2,
                  32.6,
                  20.0,
                  6.4,
                  3.3
                ]
              }
            ]
          }
        ]
      },

      // 极坐标曲线
      polar: {
        title: {
          text: "极坐标双数值轴"
        },
        legend: {
          data: ["line"]
        },
        polar: {
          center: ["50%", "54%"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        angleAxis: {
          type: "value",
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: "polar",
            name: "line",
            type: "line",
            showSymbol: false,
            data: (function gen(array, i) {
              const length = array.length;
              if (length >= i) {
                return array;
              }
              let t = length / 180 * Math.PI;
              let r = Math.sin(2 * t) * Math.cos(2 * t);
              array.push([r, length]);
              return gen(array, i);
            })([], 360)
          }
        ],
        animationDuration: 2000
      },
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>

