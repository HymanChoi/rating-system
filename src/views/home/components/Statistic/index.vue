<template>
  <n-grid class="home-top row" :x-gap="20" :cols="24">
    <n-gi :span="12">
      <n-statistic label="电影" v-model:value="moviesCount">
        <template #prefix>
          <n-icon>
            <IosFilm />
          </n-icon>
        </template>
        <template #suffix> 部 </template>
      </n-statistic>
    </n-gi>
    <n-gi :span="12">
      <n-statistic label="电视剧" v-model:value="seriesCount">
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
import { defineComponent } from "vue";
import { IosFilm } from "@vicons/ionicons4";

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
  },
});
</script>

<style scoped></style>
