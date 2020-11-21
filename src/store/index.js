/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
    onTaskChange(state, { listId, taskId, checked }) {
      const list = state.tasks[listId];
      const task = list.find((item) => item.taskId === taskId);
      task.checked = checked;
    },
    deleteList(state, { listId }) {
      // console.log(state.lists);
      const index = state.lists.findIndex((list) => list.listId === listId);
      if (index !== -1) {
        state.lists.splice(index, 1);
      }
      delete state.tasks[listId];
    },
    deleteTask(state, payload) {
      const list = state.tasks[payload.listId];
      list.splice(payload.taskId, 1);
    },
    setLoadedLists(state, lists) {
      state.lists = lists;
    },
    setLoadedTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async deleteTask({ commit, state }, payload) {
      const userId = state.user.id;
      await await firebase.database()
        .ref(`tasks/${userId}/${payload.listId}/${payload.taskId}`).remove();
      commit('deleteTask', payload);
    },
    async loadTasks({ state, commit }) {
      const userId = state.user.id;
      const data = await firebase.database().ref(`tasks/${userId}`).once('value');
      const tasks = {};
      const dbTasksByList = data.val();

      for (const listId in dbTasksByList) {
        const dbListTasks = dbTasksByList[listId];
        const listTasks = [];
        tasks[listId] = listTasks;

        for (const taskId in dbListTasks) {
          const dbTask = dbListTasks[taskId];
          dbTask.taskId = taskId;
          listTasks.push(dbTask);
        }
      }
      commit('setLoadedTasks', tasks);
    },

    async loadLists({ commit, state }) {
      const userId = state.user.id;
      const data = await firebase.database().ref(`lists/${userId}`).once('value');
      const lists = [];
      const dbList = data.val();

      for (const key in dbList) {
        lists.push({
          listId: key,
          title: dbList[key].title,
        });
      }

      commit('setLoadedLists', lists);
    },
    async onTaskChange({ commit, state }, payload) {
      const { listId } = payload;
      const { taskId } = payload;
      const { checked } = payload;
      const userId = state.user.id;
      await firebase.database().ref(`tasks/${userId}/${listId}/${taskId}`)
        .update({ checked });
      commit('onTaskChange', { listId, taskId, checked });
    },
    async deleteList({ commit, state }, { listId }) {
      const userId = state.user.id;
      // await firebase.database().ref(`lists/${userId}/${listId}`).set(null);
      // await firebase.database().ref(`lists/${userId}/${listId}`).remove();
      // await firebase.database().ref(`tasks/${userId}/${listId}`).remove();
      await firebase.database().ref().update({
        [`lists/${userId}/${listId}`]: null,
        [`tasks/${userId}/${listId}`]: null,
      });
      commit('deleteList', { listId });
    },
    async createTask({ commit, state }, payload) {
      const userId = state.user.id;
      const { listId } = payload;
      const task = { title: payload.taskTitle, checked: payload.checked };
      // console.log(listId);
      // console.log(userId);
      // console.log(task);
      const data = await firebase.database().ref(`tasks/${userId}/${listId}`).push(task);
      commit('createTask', {
        listId,
        task: { taskId: data.key, title: payload.taskTitle, checked: payload.checked },
      });
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
