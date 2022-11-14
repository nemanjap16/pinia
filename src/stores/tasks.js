import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    modalOpen: false,
    isLoading: false,
  }),
  getters: {
    returnFavorite() {
      return this.tasks.filter((el) => el.isFav);
    },
    favoriteCount() {
      return this.tasks.reduce((previous, current) => {
        return current.isFav ? previous + 1 : previous;
      }, 0);
    },
    totalCount() {
      return this.tasks.length;
    },
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this.tasks = data;
      this.isLoading = false;
    },
    async addTask(newTask) {
      this.tasks.push(newTask);

      try {
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: { "Content-Type": "application/json" },
        });
        console.log(res.status);
      } catch (error) {
        console.log(error);
      }
    },
    async editTask(obj) {
      const task = this.tasks.find((task) => task.id === obj.id);
      task.title = obj.title;
      try {
        const res = await fetch(`http://localhost:3000/tasks/${obj.id}`, {
          method: "PATCH",
          body: JSON.stringify({ title: task.title }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;

      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
});
