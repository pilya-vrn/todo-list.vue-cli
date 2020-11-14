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
    createList(state, { title, listId }) {
      state.lists.push({ title, listId });
      // Vue.set(state.tasks, id, []); с записью первой таски инициализируется массив на сервере
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
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, psw);
      // console.log('user');
      // console.log(user);
      const newUser = { id: user.uid };
      // console.log('user.uid');
      // console.log(user.uid);
      commit('setUser', newUser);
    },
    async signUserIn({ commit }, { email, psw }) {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, psw);
      // console.log('user');
      // console.log(user);
      const newUser = { id: user.uid };
      // console.log(user.uid);
      // console.log('newUser');
      // console.log(newUser);
      commit('setUser', newUser);
    },
    async createList({ commit, state }, { title }) {
      const list = { title };
      const userId = state.user.id;
      // console.log('userId');
      // console.log(userId);
      const data = await firebase.database().ref(`lists/${userId}`).push(list);
      commit('createList', { title, listId: data.key });
    },
  },
  modules: {
  },
});
