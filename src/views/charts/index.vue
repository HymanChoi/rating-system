<template>
  <div class="charts">
    <n-page-header subtitle="返回首页" @back="handleBack"></n-page-header>
    <n-grid :x-gap="20" :cols="24">
      <n-gi :span="12">
        <div id="chart">
          <apexchart
            type="treemap"
            width="380"
            height="440"
            :options="chartOptions"
            :series="series"
            @click="handleClick"
          ></apexchart>
        </div>
      </n-gi>
      <n-gi :span="12">
        <div class="title">
          <n-tag v-show="curTag.x" type="success">{{ curTag.x }}</n-tag>
          <n-tag v-show="curTag.y" type="info">{{ curTag.y }} 部</n-tag>
        </div>
        <RankList :list="list" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRaw, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/db";
import { Tag } from "@/type";
import { compare } from "@/utils";
import RankList from "@/components/RankList/index.vue";

export default defineComponent({
  name: "Charts",
  components: {
    RankList,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      type: 0,
      list: [],
      curTag: {},
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        theme: {
          mode: "dark",
        },
        legend: {
          show: false,
        },
        chart: {
          type: "treemap",
          toolbar: {
            show: false,
          },
          background: "#18181c",
        },
        title: {
          text: "作品标签分布",
          align: "center",
          style: {
            fontSize: "16px",
            color: "#eeeeee",
          },
        },
        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
      /**
       * 返回首页
       */
      handleBack() {
        router.go(-1);
      },
      /**
       * 获取标签列表
       */
      async getTags() {
        const tags =
          data.type === 0
            ? await db.moviesTags.toArray()
            : await db.seriesTags.toArray();

        data.getTagsCount(tags);
      },
      /**
       *
       */
      async getTagsCount(tags: Tag[]) {
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          const count = await db.works
            .where("type")
            .equals(data.type)
            .filter((i) => {
              return i.tags.indexOf(tag.name) !== -1;
            })
            .count();
          data.series[0].data.push({ x: tag.name, y: count });
        }
      },
      /**
       * 查看包含某标签的所有作品
       */
      async handleClick(event, chartContext, config) {
        data.curTag = data.series[0].data[config.dataPointIndex];
        data.list = await db.works
          .where("type")
          .equals(data.type)
          .filter((i) => {
            return i.tags.indexOf(data.curTag.x) !== -1;
          })
          .toArray()
          .then((res) => res.sort(compare("score", "desc")));
      },
      /**
       * 跳转到作品详情页
       *
       * @param name
       */
      goToWorkInfo(name: string) {
        router.push({ path: "info", query: { name: name } });
      },
    });

    onBeforeMount(() => {
      data.type = parseInt(route.query.type as string);
      data.getTags();
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.charts {
  padding: 20px;
}
#chart {
  margin-top: 20px;
}
.n-tag + .n-tag {
  margin-left: 10px;
}
.title {
  height: 65px;
  line-height: 65px;
  text-align: center;
}
.list {
  height: calc(100vh - 165px);
  padding: 10px;
  overflow-y: overlay;
  background-color: rgba(0, 128, 0, 0.12);
}
.list-item {
  display: flex;
  text-align: center;
  cursor: pointer;
  line-height: 32px;
}
.list-item:hover {
  background-color: rgba(0, 128, 0, 1);
}
.list-item .id {
  width: 80px;
}
.list-item .name {
  flex: 1;
}
.list-item .score {
  width: 60px;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0);
}
.list:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
