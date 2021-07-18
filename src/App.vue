<template>
  <div id="app">
    <n-layout>
      <n-layout-header>
        <h1>Note</h1>
        <n-menu
          @update:value="handleUpdateValue"
          mode="horizontal"
          :options="menuOptions"
        />
      </n-layout-header>
      <n-layout-content>
        <n-message-provider>
          <router-view />
        </n-message-provider>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup>
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NIcon,
  useMessage,
  NMenu,
  NMessageProvider,
} from "naive-ui";
import {
  ListOutlined as ListIcon,
  ModeEditOutlineFilled as EditIcon,
} from "@vicons/material";
import { ref, h, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: "主页",
    key: "/",
    icon: renderIcon(ListIcon),
  },
  {
    label: "编辑页",
    key: "/edit",
    icon: renderIcon(EditIcon),
  },
];

const handleUpdateValue = (key, item) => {
  router.push({ path: key });
};

onMounted(() => {
  let myData = localStorage.getItem("myData");
  if (myData) {
    let list = JSON.parse(myData);
    store.commit("updateList", list);
  }
});

window.onbeforeunload = (event) => {
  let list = store.state.list;
  localStorage.setItem("myData", JSON.stringify(list));
};
</script>

<style lang="postcss" scoped>
#app {
  background: #f5f5f5;

  & .n-layout-header {
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
  }

  & .n-layout-content {
    margin: auto;
    padding: 16px;
    max-width: 660px;
  }

  & .n-button {
    margin: 10px;
  }
}
</style>
