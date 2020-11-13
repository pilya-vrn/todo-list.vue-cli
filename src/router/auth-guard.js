import store from '../store';

export default function (to, from, next) {
  // store.getters.user
  if (store.state.user) {
    next();
  } else {
    next('/signin');
  }
}
