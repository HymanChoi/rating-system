<template>
  <n-grid :x-gap="20" :cols="24">
    <n-gi :span="12">
      <n-statistic
        class="statistic"
        label="电影"
        v-model:value="moviesCount"
        title="点击查看类型详情"
        @click="goToCharts(0)"
      >
        <template #prefix>
          <n-icon>
            <IosFilm />
          </n-icon>
        </template>
        <template #suffix> 部 </template>
      </n-statistic>
    </n-gi>
    <n-gi :span="12">
      <n-statistic
        class="statistic"
        label="电视剧"
        v-model:value="seriesCount"
        title="点击查看类型详情"
        @click="goToCharts(1)"
      >
        <template #prefix>
          <n-icon>
            <IosFilm />
          </n-icon>
        </template>
        <template #suffix> 部 </template>
      </n-statistic>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { IosFilm } from "@vicons/ionicons4";
import router from "@/router";

export default defineComponent({
  name: "",
  props: {
    moviesCount: Number,
    seriesCount: Number,
  },
  components: {
    IosFilm,
  },
  setup(props) {
    const moviesCount = props.moviesCount;
    const seriesCount = props.seriesCount;
    const data = reactive({
      /**
       * 跳转到作品详情页
       *
       * @param type
       */
      goToCharts(type: number) {
        router.push({ path: "charts", query: { type: type } });
      },
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.statistic:hover {
  cursor: pointer;
}
</style>
