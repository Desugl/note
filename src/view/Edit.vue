<template>
  <n-space vertical>
    <n-input
      v-model:value="title"
      placeholder="这里写标题"
      maxlength="10"
      show-count
      clearable
      autosize
      style="width: 170px"
    />
    <textarea id="my-text-area"></textarea>
  </n-space>
  <n-divider />
  <n-button v-if="edit" @click="onEdit">保存</n-button>
  <n-button v-else @click="onAdd">添加</n-button>
</template>

<script setup>
import { NDivider, NInput, NSpace, NButton, useMessage } from "naive-ui";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";

const store = useStore();
const route = useRoute();
const message = useMessage();

const initNote = {
  id: "",
  title: "",
  content: "",
};
let easyMDE = null;
let title = ref("");
let edit = ref(false);
let idx = route.params.idx;

const onAdd = () => {
  const note = {
    ...initNote,
    id: uuidv4(),
    title: title.value,
    content: easyMDE.value(),
  };
  store.commit("addNote", note);
  message.success("添加成功");
  //switch edit mode
  idx = 0;
  edit.value = true;
};

const onEdit = () => {
  const data = {
    idx: idx,
    title: title.value,
    content: easyMDE.value(),
  };
  store.commit("updateNote", data);
  message.success("保存成功");
};

onMounted(() => {
  const dom = document.getElementById("my-text-area");
  easyMDE = new EasyMDE({
    element: dom,
    toolbar: [
      "bold",
      "italic",
      "strikethrough",
      "|",
      "heading-smaller",
      "heading",
      "heading-bigger",
      "|",
      "code",
      "table",
      "quote",
      "unordered-list",
      "ordered-list",
      "|",
      "link",
      "image",
      "horizontal-rule",
      "|",
      "side-by-side",
      "fullscreen",
      "preview",
      "|",
      "guide",
    ],
    spellChecker: false,
  });

  if (idx && store.state.list[idx] != null) {
    edit.value = true;
    title.value = store.state.list[idx].title;
    easyMDE.value(store.state.list[idx].content);
  }
});
</script>

<style scoped>
.n-space {
  align-items: center;
}
</style>