<template>
  <div>
    <input type="text" v-model.lazy="todoName" />
    <button type="button" @click="onBtnAddClick(todoName)">Add</button>
    <button type="reset">Reset</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TodoForm",
  emits: ["add-todo"],
  setup(_, { emit }) {
    const todoName = ref("");
    const onBtnAddClick = (todoName) => {
      emit("add-todo", todoName);
    };
    return {
      todoName,
      onBtnAddClick,
    };
  },
};
</script>

<style scoped>
</style>