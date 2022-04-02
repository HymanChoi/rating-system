<template>
  <div class="home">
    <n-grid :x-gap="20" :cols="24">
      <n-gi :span="12">
        <Statistic
          label="电影"
          :count="moviesCount"
          path="charts"
          :query="{ type: 0 }"
        />
      </n-gi>
      <n-gi :span="12">
        <Statistic
          label="电视剧"
          :count="seriesCount"
          path="charts"
          :query="{ type: 1 }"
        />
      </n-gi>
    </n-grid>

    <n-grid :x-gap="20" :cols="24">
      <n-gi :span="12"> <RankList :list="movies" /> </n-gi>
      <n-gi :span="12"> <RankList :list="series" /> </n-gi>
    </n-grid>

    <n-grid :x-gap="20" :cols="24">
      <n-gi :span="12">
        <n-button style="width: 100%" @click="activate(0)"> 添加电影 </n-button>
      </n-gi>
      <n-gi :span="12">
        <n-button style="width: 100%" @click="activate(1)">
          添加电视剧
        </n-button>
      </n-gi>
    </n-grid>

    <n-drawer v-model:show="active" width="382" :placement="placement">
      <n-drawer-content :title="title">
        <n-form
          class="form"
          ref="formRef"
          label-placement="left"
          label-width="auto"
          size="medium"
        >
          <n-form-item label="名称" path="name" required>
            <n-input v-model:value="name" placeholder="请输入名称" />
          </n-form-item>
          <n-form-item label="评分" path="inputValue">
            <n-rate allow-half v-model:value="score" />
          </n-form-item>
          <n-form-item label="标签" path="tags">
            <n-dynamic-tags v-model:value="tags" />
          </n-form-item>
          <n-button type="primary" @click="addWork"> 提交 </n-button>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  toRaw,
  toRefs,
  watch,
} from "vue";
import Statistic from "./components/Statistic/index.vue";
import RankList from "@/components/RankList/index.vue";
import { useMessage } from "naive-ui";
import { compare } from "@/utils";
import { addTagDB, addWorkDB, getWorkListDB } from "@/db/operate";
import { searchMovieFormDouBan } from "@/api";

interface DataProps {
  timer: any;
  moviesCount: number;
  seriesCount: number;
  type: number;
  name: string;
  score: number;
  tags: Array<string>;
  movies: any;
  series: any;
  active: boolean;
  placement: string;
  title: string;
  addWork: () => void;
  clearData: () => void;
  getList: () => void;
  activate: (type: number) => void;
  searchMovieFormDouBan: () => void;
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
      timer: null,
      name: "",
      type: 0,
      score: 0,
      tags: [],
      movies: [],
      moviesCount: 0,
      series: [],
      seriesCount: 0,
      active: false,
      placement: "",
      title: "",
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
          await addWorkDB(work);
          await addTagDB(work);
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
        data.active = false;
      },
      /**
       * 获取列表
       */
      async getList() {
        // 获取电影列表
        const moviesList = await getWorkListDB("type", 0);
        data.movies = moviesList.sort(compare("score", "desc"));
        data.moviesCount = moviesList.length;

        // 获取电视剧列表
        const seriesList = await getWorkListDB("type", 1);
        data.series = seriesList.sort(compare("score", "desc"));
        data.seriesCount = seriesList.length;
      },
      /**
       *
       * @param type 作品类型
       */
      activate(type: number) {
        data.type = type;
        data.title = type ? "添加电视剧" : "添加电影";
        data.placement = type ? "left" : "right";
        data.active = true;
      },
      /**
       *
       */
      searchMovieFormDouBan() {
        data.timer = setTimeout(() => {
          searchMovieFormDouBan({
            q: data.name,
          }).then((res: any) => {
            if (res.count) {
              const info = res.subjects[0];
              data.tags = Array.from(
                new Set([...info.countries, ...info.genres])
              );
            }
          });
        }, 1000);
      },
    });

    watch(
      () => data.name,
      (newVal) => {
        clearTimeout(data.timer);
        data.tags = [];
        if (newVal) {
          data.searchMovieFormDouBan();
        }
      }
    );

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
</style>
