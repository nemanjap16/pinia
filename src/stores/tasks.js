import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [
      { id: 1, title: "buy some milk", isFav: false },
      { id: 2, title: "buy chocolate", isFav: true },
    ],
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
});
