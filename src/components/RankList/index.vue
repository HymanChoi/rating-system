<template>
  <div class="list">
    <div
      class="list-item"
      v-for="(item, index) of list"
      :key="index + 'series'"
      title="点击查看作品详情"
      @click="goToWorkInfo(item.name)"
    >
      <span class="id">第 {{ index + 1 }} 名</span>
      <span class="name">{{ item.name }}</span>
      <span class="score">{{ item.score }} 分</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RankList",
  props: ["list"],
  setup() {
    const router = useRouter();
    const data = reactive({
      /**
       * 跳转到作品详情页
       *
       * @param name
       */
      goToWorkInfo(name: string) {
        router.push({ path: "info", query: { name: name } });
      },
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.list {
  height: calc(100vh - 199px);
  padding: 10px;
  overflow-y: overlay;
  background-color: rgba(0, 128, 0, 0.12);
}
.list:nth-child(even) {
  background-color: rgba(0, 128, 0, 0.24);
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
