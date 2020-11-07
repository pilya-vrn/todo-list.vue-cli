import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    tasks: {},
  },
  mutations: {
    createList(state, { title, id }) {
      state.lists.push({ title, id });
      Vue.set(state.tasks, id, []);
    },
    createTask(state, { listId, taskTitle, checked }) {
      const list = state.tasks[listId];
      const task = { title: taskTitle, checked };
      list.unshift(task);
    },
    onTaskChange(state, { listId, taskIndex, checked }) {
      const list = state.tasks[listId];
      list[taskIndex].checked = checked;
    },
    deleteList(state, { listId }) {
      const index = state.lists.findIndex((n) => n.id === listId);
      if (index !== -1) {
        state.lists.splice(index, 1);
      }
    },
    deleteTask(state, { listId, taskIndex }) {
      const list = state.tasks[listId];
      list.splice(taskIndex, 1);
    },

  },
  actions: {
  },
  modules: {
  },
});
