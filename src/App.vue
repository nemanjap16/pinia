<script setup>
import IconPiniaVue from "./components/icons/IconPinia.vue";
import { useTasksStore } from "./stores/tasks";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";

const taskStore = useTasksStore();
const filter = ref("all");
</script>

<template>
  <header>
    <div class="header">
      <IconPiniaVue height="60px" width="60px" />
      <h1>Pinia Tasks</h1>
    </div>
  </header>

  <nav class="filter">
    <button aria-label="Show all" @click="filter = 'all'">All Tasks</button>
    <button aria-label="Show favorite" @click="filter = 'favs'">
      Favorite Tasks
    </button>
  </nav>

  <main>
    <!-- All -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks in your list.</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <!-- Favorite -->
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favoriteCount }} tasks in your favs list.</p>
      <div v-for="task in taskStore.returnFavorite" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  gap: 15px;
}
</style>
