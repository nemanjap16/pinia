<template>
  <div class="task">
    <h3>{{ props.task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="toggleModal()">edit</i>
      <i class="material-icons" @click="deleteTask(task.id)">delete</i>
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="toggleFav(task.id)"
        >favorite</i
      >
    </div>
  </div>
  <div v-if="modalOpen">
    <EditForm :task="task" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTasksStore } from "../stores/tasks";
import EditForm from "./EditForm.vue";

const props = defineProps({
  task: {
    type: Object,
  },
});

const taskStore = useTasksStore();
const { deleteTask, toggleFav, toggleModal } = useTasksStore();

const { modalOpen } = storeToRefs(taskStore);
</script>

<style scoped>
.task-wrapper {
  position: relative;
}
</style>
