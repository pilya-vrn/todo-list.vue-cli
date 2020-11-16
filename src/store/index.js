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
    resetStore(state) {
      state.lists = [];
      state.tasks = {};
      state.user = null;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    createList(state, { listId, title }) {
      state.lists.push({ listId, title });
      // console.log(state.lists);
      // Vue.set(state.tasks, listId, []);
    },
    createTask(state, { listId, task }) {
      // console.log(task);
      const list = state.tasks[listId];

      if (!list) {
        Vue.set(state.tasks, listId, [task]);
      } else {
        list.push(task);
      }
      // const task = { title: taskTitle, checked };
      // list.unshift(task);
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
    async createTask({ commit, state }, payload) {
      const userId = state.user.id;
      const { listId } = payload;
      // console.log(listId);
      const task = { title: payload.taskTitle, checked: payload.checked };
      const data = await firebase.database().ref(`lists/${userId}/${listId}`).push(task);
      commit('createTask', { listId, task: { id: data.key, task } });
    },
    async signUserUp({ commit }, { email, psw }) {
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, psw);
        const newUser = { id: user.uid };
        commit('setUser', newUser);
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      }
    },
    async signUserIn({ commit }, { email, psw }) {
      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, psw);
        const newUser = { id: user.uid };
        commit('setUser', newUser);
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(err.message);
      }
    },
    async createList({ commit, state }, { title }) {
      const list = { title };
      const userId = state.user.id;
      // console.log('state.user');
      // console.log(state.user);
      const data = await firebase.database().ref(`lists/${userId}`).push(list);
      commit('createList', { listId: data.key, title });
      // console.log(data.key);
    },
    logUserOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  modules: {
  },
});
