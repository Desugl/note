<template>
  <n-list-item class="task-item-wrapper">
    <template #prefix>
      <n-icon size="16">
        <drag-indicator-outlined />
      </n-icon>
    </template>
    <swiper
      :initial-slide="1"
      :slides-per-view="1"
      :resistance-ratio="0"
      :speed="200"
      @transitionEnd="onTransitionEnd"
      @tap="onTap"
    >
      <swiper-slide class="left-slide">编辑</swiper-slide>
      <swiper-slide>{{ note.title }}</swiper-slide>
      <swiper-slide class="right-slide">删除</swiper-slide>
    </swiper>
  </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";

const props = defineProps({
  note: Object,
});

const emit = defineEmit(["delete", "edit", "info"]);

const onTransitionEnd = (instance) => {
  const { activeIndex } = instance;
  if (activeIndex === 0) {
    emit("edit");
  } else if (activeIndex === 2) {
    emit("delete");
    instance.destroy();
  }
};

const onTap = () => {
  emit("info");
};
</script>

<style lang="postcss">
.task-item-wrapper {
  padding: 0 !important;
  border: 1px solid var(--merged-border-color);
  cursor: move;

  & .n-list-item__prefix {
    margin: 0px !important;
    padding: 8px;
    display: flex;
  }

  & .swiper-container {
    width: 100%;
    height: 100%;
    cursor: default;
  }

  & .swiper-slide {
    padding: 8px 0;
    display: flex;
    align-items: center;
    width: 100% !important;
  }

  & .left-slide {
    color: white;
    background: #0099ff;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 8px;
  }

  & .right-slide {
    color: white;
    background: tomato;
    padding-left: 8px;
    justify-content: flex-start;
    box-sizing: border-box;
  }
}

.task-item-wrapper:not(:last-child) {
  border-bottom: none !important;
}
</style>