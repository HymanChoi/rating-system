<template>
  <div class="info">
    <n-page-header subtitle="返回首页" @back="handleBack"></n-page-header>

    <n-form
      class="form"
      ref="formRef"
      v-model="workInfo"
      label-placement="top"
      label-width="auto"
      size="medium"
    >
      <n-grid :x-gap="20" :cols="24">
        <n-gi :span="12">
          <div class="img"></div>
        </n-gi>
        <n-gi :span="12">
          <n-form-item label="名称" path="name" required>
            <n-input v-model:value="workInfo.name" placeholder="Input" />
          </n-form-item>
          <n-form-item label="类型" path="type">
            <n-radio-group
              v-model:value="workInfo.type"
              :default-value="workInfo.type"
            >
              <n-space>
                <n-radio :value="0"> 电影 </n-radio>
                <n-radio :value="1"> 电视剧 </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="评分" path="inputValue">
            <n-rate allow-half v-model:value="workInfo.score" />
          </n-form-item>
          <n-form-item label="标签" path="tags">
            <n-dynamic-tags v-model:value="workInfo.tags" />
          </n-form-item>
          <n-button class="btn" type="primary" @click="editWork">修改</n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRaw, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { db } from "@/db";

interface DataProps {
  workInfo: any;
  handleBack: () => void;
  getWorkInfo: (name: string) => void;
  editWork: () => void;
}

export default defineComponent({
  name: "Info",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const message = useMessage();
    const data: DataProps = reactive({
      workInfo: {
        name: "",
        type: 0,
        score: 0,
        tags: [],
      },
      /**
       * 返回首页
       */
      handleBack() {
        router.go(-1);
      },
      /**
       * 获取作品信息
       *
       * @param name 名称
       */
      async getWorkInfo(name: string) {
        await db.works
          .where("name")
          .equals(name)
          .first()
          .then((res) => {
            data.workInfo = res;
          });
      },
      /**
       * 修改作品
       */
      async editWork() {
        const work = {
          name: data.workInfo.name,
          type: data.workInfo.type,
          score: data.workInfo.score,
          tags: toRaw(data.workInfo.tags),
        };

        try {
          await db.works.where("name").equals(data.workInfo.name).modify(work);
          message.success("修改成功");
        } catch (err) {
          console.error(err);
        }
      },
    });

    onBeforeMount(() => {
      const name = route.params.name as string;
      data.getWorkInfo(name);
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped>
.info {
  padding: 20px;
}

.info .img {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 128, 0, 0.12);
}

.info .form {
  margin-top: 20px;
}
</style>
