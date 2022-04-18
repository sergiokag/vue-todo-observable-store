<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <p>{{ todo.title }}</p>
      <button type="button" @click="onTodoStatusUpdate(todo)">
        {{ todo.isCompleted ? "Completed" : "Not Completed" }}
      </button>
    </li>
  </ul>
</template>

<script>
import { toRefs } from "vue";

export default {
  name: "TodoList",
  emits: ["status-update"],
  props: ["list"],
  setup(props, { emit }) {
    const { list } = toRefs(props);
    const onTodoStatusUpdate = (todo) => {
      todo.isCompleted = !todo.isCompleted;
      emit("status-update", todo);
    };

    return {
      todos: list,
      onTodoStatusUpdate,
    };
  },
};
</script>

<style scoped>
</style>