<template>
  <h1 class="text-center">Todo List</h1>
  <div class="grid-container">
    <div class="grid-item form-item">
      <TodoForm @add-todo="onAddTodo"></TodoForm>
    </div>
    <div class="grid-item left-list-item">
      <TodoList :list="todoList" @status-update="onStatusUpdated"></TodoList>
      <p>
        {{ todoList }}
      </p>
    </div>
    <div class="grid-item right-list-item">
      <TodoList
        :list="completedList"
        @status-update="onStatusUpdated"
      ></TodoList>
      <p>
        {{ completedList }}
      </p>
    </div>
  </div>
</template>

<script>
// Core
import { onMounted, onUnmounted, ref } from "vue";

// Components
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

// FacadeService
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
    let subscription;

    onMounted(() => {
      // TODO refactor
      subscription = facadeService.stateChanged$.subscribe((state) => {
        completedList.value = state.todos.filter((obj) => obj.isCompleted);
        todoList.value = state.todos.filter((obj) => !obj.isCompleted);
      });
    });

    onUnmounted(() => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });

    const onAddTodo = ($event) => {
      // TODO refactor
      const todoItem = {
        id: Math.random() * Date.now(),
        name: $event,
        isCompleted: false,
      };

      facadeService.addTodo(todoItem);
    };

    const onStatusUpdated = ($event) => {
      facadeService.updateList($event);
    };

    return {
      todoList,
      completedList,
      onAddTodo,
      onStatusUpdated,
    };
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
.form-item {
  grid-area: form;
}

.left-list-item {
  grid-area: leftlist;
}

.right-list-item {
  grid-area: rightlist;
}

.grid-container {
  display: grid;
  gap: 15px;
  grid-template-areas:
    "form form form form"
    "leftlist leftlist rightlist rightlist"
    "leftlist leftlist rightlist rightlist";
  justify-items: center;
}
</style>
