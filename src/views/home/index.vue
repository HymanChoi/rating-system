<template>
  <div class="home">
    <Statistic :moviesCount="moviesCount" :seriesCount="seriesCount" />

    <n-grid :x-gap="20" :cols="24">
      <n-gi :span="12"> <RankList :list="movies" /> </n-gi>
      <n-gi :span="12"> <RankList :list="series" /> </n-gi>
    </n-grid>

    <n-grid :x-gap="20" :y-gap="20" :cols="24">
      <!-- 类型 -->
      <n-gi :span="5">
        <n-radio-group v-model:value="type">
          <n-radio-button :value="0"> 电影 </n-radio-button>
          <n-radio-button :value="1"> 电视剧 </n-radio-button>
        </n-radio-group>
      </n-gi>
      <!-- 名称 -->
      <n-gi :span="14">
        <n-input
          v-model:value="name"
          type="text"
          placeholder="请输入作品名称"
        />
      </n-gi>
      <!-- 评分 -->
      <n-gi class="rate" :span="5">
        <n-rate allow-half v-model:value="score" />
      </n-gi>

      <!-- 标签 -->
      <n-gi class="tags" :span="20">
        <n-dynamic-tags v-model:value="tags" />
      </n-gi>
      <!-- 按钮 -->
      <n-gi :span="4">
        <n-button class="btn" type="primary" @click="addWork">提交</n-button>
      </n-gi>
    </n-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRaw, toRefs } from "vue";
import Statistic from "./components/Statistic/index.vue";
import RankList from "@/components/RankList/index.vue";
import { useMessage } from "naive-ui";
import { db } from "@/db";
import { compare } from "@/utils";
import { addTag } from "@/utils/db";

interface DataProps {
  moviesCount: number;
  seriesCount: number;
  type: number;
  name: string;
  score: number;
  tags: Array<string>;
  movies: any;
  series: any;
  addWork: () => void;
  clearData: () => void;
  getList: () => void;
}

export default defineComponent({
  name: "Home",
  components: {
    Statistic,
    RankList,
  },
  setup() {
    const message = useMessage();
    const data: DataProps = reactive({
      name: "",
      type: 0,
      score: 0,
      tags: [],
      movies: [],
      moviesCount: 0,
      series: [],
      seriesCount: 0,
      /**
       * 添加作品
       */
      async addWork() {
        if (!data.name) {
          message.warning("作品名称不能为空");
          return;
        }

        const work = {
          name: data.name,
          type: data.type,
          score: data.score,
          tags: toRaw(data.tags),
        };

        try {
          await db.works.add(work, "name");
          addTag(work);
          message.success("添加成功");
          data.clearData();
          data.getList();
        } catch (err) {
          message.error("该作品已添加");
          console.error(err);
        }
      },
      /**
       * 重置表单
       */
      clearData() {
        data.name = "";
        data.type = 0;
        data.score = 0;
        data.tags = [];
      },
      /**
       * 获取列表
       */
      getList() {
        // 获取电影列表
        db.works
          .where("type")
          .equals(0)
          .toArray()
          .then((res) => {
            data.movies = res.sort(compare("score", "desc"));
            data.moviesCount = res.length;
          });

        // 获取电视剧列表
        db.works
          .where("type")
          .equals(1)
          .toArray()
          .then((res) => {
            data.series = res.sort(compare("score", "desc"));
            data.seriesCount = res.length;
          });
      },
    });

    onBeforeMount(() => {
      data.getList();
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.home {
  padding: 20px;
}
.n-grid + .n-grid {
  margin-top: 20px;
}
.rate {
  display: flex;
  justify-content: center;
  align-items: center;
}
.tags {
  display: flex;
  align-items: center;
}
.btn {
  width: 100%;
}
</style>
