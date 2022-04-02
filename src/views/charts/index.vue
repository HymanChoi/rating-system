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
          />
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
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Tag } from "@/type";
import RankList from "@/components/RankList/index.vue";
import {
  getTagListDB,
  getWorkCountByTagDB,
  getWorkListByTagDB,
} from "@/db/operate";
import { compare } from "@/utils";

interface CurTag {
  x: string;
  y: number;
}

interface DataProps {
  type: number;
  list: Array<any>;
  curTag: CurTag;
  series: Array<any>;
  chartOptions: object;
  handleBack: () => void;
  getTags: () => void;
  getTagsCount: (tags: Array<Tag>) => void;
  handleClick: (_event: any, _chartContext: any, config: any) => void;
  goToWorkInfo: (name: string) => void;
}

export default defineComponent({
  name: "Charts",
  components: {
    RankList,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data: DataProps = reactive({
      type: 0,
      list: [],
      curTag: { x: "", y: 0 },
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
          "#BDE978",
          "#9CD354",
          "#70B724",
          "#579D1A",
          "#418312",
          "#6AD5FF",
          "#45BFFF",
          "#079CFF",
          "#0579DB",
          "#035AB7",
          "#FFDC66",
          "#FFCD3F",
          "#FFB600",
          "#DB9600",
          "#B77800",
          "#FF9B7F",
          "#FF7460",
          "#FF352B",
          "#DB1F26",
          "#B71529",
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
        const tags = await getTagListDB(data.type);
        data.getTagsCount(tags);
      },
      /**
       *
       */
      async getTagsCount(tags: Array<Tag>) {
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          const count = await getWorkCountByTagDB("type", data.type, tag.name);
          data.series[0].data.push({ x: tag.name, y: count });
        }
      },
      /**
       * 查看包含某标签的所有作品
       *
       * @param _event
       * @param _chartContext
       * @param config
       */
      async handleClick(_event: any, _chartContext: any, config: any) {
        data.curTag = data.series[0].data[config.dataPointIndex];
        const list = await getWorkListByTagDB("type", data.type, data.curTag.x);
        data.list = list.sort(compare("score", "desc"));
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
}
</style>
