<template>
  <form @submit.prevent="handleSubmit">
    <input
      type="text"
      name="task"
      id="task"
      placeholder="i need ..."
      v-model="newTask"
    />
    <button>Add</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "../stores/tasks";

const taskStore = useTasksStore();
const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      title: newTask.value,
      isFav: false,
      id: Math.floor(Math.random() * 1000),
    });
  }
  newTask.value = "";
};
</script>

<style scoped></style>
