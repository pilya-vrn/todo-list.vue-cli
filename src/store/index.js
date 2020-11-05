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
      console.log(listId, taskIndex, checked);
      const list = state.tasks[listId];
      list[taskIndex].checked = checked;
    },
    deleteList(state, { listId }) {
      // const list = state.lists[listId];
      // list.splice(listId, 1);
      state.lists.splice(listId, 1);
    },
    deleteTask(state, { listId, taskIndex }) {
      // console.log(listId, taskIndex);
      const list = state.tasks[listId];
      // list.tasks.splice(taskIndex, 1);
      list.splice(taskIndex, 1);
    },

  },
  actions: {
  },
  modules: {
  },
});
