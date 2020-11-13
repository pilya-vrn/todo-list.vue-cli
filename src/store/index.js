import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lists: [],
    tasks: {},
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
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
      delete state.tasks[listId];
    },
    deleteTask(state, { listId, taskIndex }) {
      const list = state.tasks[listId];
      list.splice(taskIndex, 1);
    },
  },
  actions: {
    async signUserUp({ commit }, { email, psw }) {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, psw);
      // console.log('user');
      // console.log(user);
      const newUser = { id: user.uid };
      commit('setUser', newUser);
    },
    async signUserIn({ commit }, { email, psw }) {
      const user = await firebase.auth().signInWithEmailAndPassword(email, psw);
      // console.log('user');
      // console.log(user);
      const newUser = { id: user.uid };
      commit('setUser', newUser);
    },
  },
  modules: {
  },
});
