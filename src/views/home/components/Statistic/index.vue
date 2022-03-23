<template>
  <n-statistic
    class="statistic"
    :label="label"
    v-model:value="count"
    title="点击查看类型详情"
    @click="goToCharts()"
  >
    <template #prefix>
      <n-icon>
        <IosFilm />
      </n-icon>
    </template>
    <template #suffix> 部 </template>
  </n-statistic>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { IosFilm } from "@vicons/ionicons4";

export default defineComponent({
  name: "Statistic",
  props: {
    label: String,
    count: Number,
    path: String,
    query: Object,
  },
  components: {
    IosFilm,
  },
  setup(props) {
    const path = props.path;
    const query = props.query;
    const router = useRouter();
    const data = reactive({
      /**
       * 跳转到作品详情页
       */
      goToCharts() {
        router.push({ path: path, query: query });
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
