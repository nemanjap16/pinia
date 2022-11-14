<template>
  <div class="edit">
    <form class="edit-form" @submit.prevent="handleSubmit()">
      <h3>Edit Task</h3>
      <input class="edit-input" type="text" name="task" v-model="title" />
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTasksStore } from "../stores/tasks";

const props = defineProps({
  task: {
    type: Object,
  },
});

const title = ref(props.task.title);
const { editTask, toggleModal } = useTasksStore();

const handleSubmit = () => {
  if (title.value) {
    editTask({
      title: title.value,
      isFav: props.task.isFav,
      id: props.task.id,
    });
  }
  toggleModal();
};
</script>

<style lang="css" scoped>
.edit {
  position: absolute;
  inset: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.edit-form {
  background-color: #ffd859;
  width: min-content;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-input {
  width: 350px;
}

h3 {
  font-weight: 700;
}

button {
  background-color: #ff005d;
  width: max-content;
  padding: 8px 20px;
  margin-inline: auto;
  color: white;
  font-weight: 500;
}
</style>
