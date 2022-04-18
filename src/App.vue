<template>
  <h1 class="text-center">Todo List</h1>
  <div class="grid-container">
    <div class="grid-item form-item">
      <TodoForm @add-todo="onAddTodo" @clear-lists="onClearLists"></TodoForm>
    </div>
    <div class="grid-item left-list-item">
      <TodoList :list="todoList" @status-update="onStatusUpdated"></TodoList>
    </div>
    <div class="grid-item right-list-item">
      <TodoList
        :list="completedList"
        @status-update="onStatusUpdated"
      ></TodoList>
    </div>
  </div>
</template>

<script>
// Core
import { onMounted, onUnmounted, ref } from "vue";

// Components
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// Services
import facadeService from "./services/facade.service";

export default {
  name: "App",
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const todoList = ref([]);
    const completedList = ref([]);
    let subscription1;
    let subscription2;

    onMounted(() => {
      subscription1 = facadeService.selectTodos$.subscribe((list) => {
        todoList.value = list;
      });

      subscription2 = facadeService.completed$.subscribe((list) => {
        completedList.value = list;
      });
    });

    onUnmounted(() => {
      if (subscription1) {
        subscription1.unsubscribe();
      }

      if (subscription2) {
        subscription2.unsubscribe();
      }
    });

    const onAddTodo = ($event) => {
      facadeService.addTodo($event);
    };

    const onStatusUpdated = ($event) => {
      facadeService.updateList($event);
    };

    const onClearLists = () => {
      facadeService.clearLists();
    };

    return {
      todoList,
      completedList,
      onAddTodo,
      onStatusUpdated,
      onClearLists,
    };
  },
};
</script>

<style>
.text-center {
  text-align: center;
}

.form-item {
  grid-column-start: 1;
  grid-column-end: 3;
}

.grid-container {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 200px;
  justify-items: center;
}
</style>
