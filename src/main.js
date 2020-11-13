import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'material-design-icons-iconfont';

Vue.config.productionTip = false;

new Vue({
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCug9eNsfHQywyDRK_c0nX3duNekKZhTEc',
      authDomain: 'todolist-c74b4.firebaseapp.com',
      databaseURL: 'https://todolist-c74b4.firebaseio.com',
      projectId: 'todolist-c74b4',
      storageBucket: 'todolist-c74b4.appspot.com',
      messagingSenderId: '1001267382481',
      appId: '1:1001267382481:web:37dc405dea660bdcc9ddf0',
    });
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('aoutoSignIn', user);
    //     this.$store.dispatch('loadLists');
    //     this.$store.dispatch('loadTasks');
    //   } else {
    //     this.$store.commit('resetStore');
    //   }
    // });
    window.firebase = firebase;
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
