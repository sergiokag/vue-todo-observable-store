<template>
  <div>
    <input type="text" v-model="todoName" />
    <button
      type="button"
      :disabled="!todoName"
      @click="onBtnAddClick(todoName)"
    >
      Add
    </button>
    <button type="button" @click="onBtnClearClick()">Clear Lists</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TodoForm",
  emits: ["add-todo", "clear-lists"],
  setup(_, { emit }) {
    const todoName = ref("");
    const onBtnAddClick = (todoNameText) => {
      emit("add-todo", todoNameText);
      todoName.value = "";
    };
    const onBtnClearClick = () => {
      emit("clear-lists");
      todoName.value = "";
    };
    return {
      todoName,
      onBtnAddClick,
      onBtnClearClick,
    };
  },
};
</script>

<style scoped>
</style>