<template>
  <n-space vertical>
    <n-list v-if="list.length">
      <draggable
        :list="list"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <note-item
            :note="element"
            :key="element.id"
            @delete="() => onDelete(index)"
            @edit="() => onEdit(index)"
            @info="() => onInfo()"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 请添加笔记 </n-thing>
    <div class="extra">
      <n-button @click="toEdit"> 添加 </n-button>
    </div>
  </n-space>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { NList, NListItem, NButton, NSpace, NThing,useMessage } from "naive-ui";
import NoteItem from "../components/NoteItem.vue";
import draggable from "vuedraggable";

const store = useStore();
const router = useRouter();
const list = computed(() => store.state.list);
const message = useMessage();

const toEdit = () => {
  router.push({ path: "/edit" });
};

const onInfo = () => {
  message.info("左右滑动试试");
}

const onDelete = (index) => {
  store.commit("delNote", index);
};

const onEdit = (index) => {
  router.push({
    name: "edit",
    params: {
      idx: index,
    },
  });
};
</script>

<style scoped>
.n-space {
  max-width: 210px;
  margin: auto;
}
.n-thing {
  text-align: center;
}

.extra {
  display: flex;
  justify-content: center;
}
</style>
