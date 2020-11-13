<template>
  <form class="container" @submit.prevent="signUp">
    <h1>Регистрация</h1>

    <div class="container signin">
    <p>Уже зарегистрированны? <router-link to="signin">Войти</router-link>.</p>
    </div>

    <p>Пожалуйста, заполните поля для регистрации</p>
    <hr>

    <label for="email"><b>Email</b></label>
    <p>
    <input type="email" placeholder="example@gmail.com"
    name="email" maxlength="33" required v-model="email">
    <p>

    <label for="psw"><b>Введите пароль</b></label>
    <p>
    <input type="password" placeholder="Введите пароль"
    name="psw" maxlength="33" required v-model="psw">
    <p>

    <label for="psw-repeat"><b>Повторите пароль</b></label>
    <p>
    <input type="password" placeholder="Повторите пароль"
    name="psw-repeat" maxlength="33" required v-model="pswRpt">
    <p>
    <hr>
    <button type="submit" class="registerbtn" >
      Зарегистрироваться!</button>
  </form>

</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      psw: '',
      pswRpt: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    },
  },
  methods: {
    signUp() {
      // добавить проверку на уже зарегистрированного пользователя
      const re = /\S+@\S+\.\S+/;

      if (this.psw !== this.pswRpt) {
        // eslint-disable-next-line no-alert
        alert('Пароли не совпадают!');
      } else if ((this.email === '') || (this.psw === '') || (this.pswRpt === '')) {
        // eslint-disable-next-line no-alert
        alert('Заполните все  поля!');
      } else if (!re.test(this.email)) {
        // eslint-disable-next-line no-alert
        alert('Введите корректный email');
      } else {
        this.$store.dispatch('signUserUp', {
          email: this.email,
          psw: this.psw,
        });

        this.email = '';
        this.psw = '';
        this.pswRpt = '';
      }
    },
  },
};
// checkValidity() {
//   const re = /\S+@\S+\.\S+/;

//   if (this.psw !== this.pswRpt) {
//     // eslint-disable-next-line no-alert
//     alert('Пароли не совпадают!');
//   } else if ((this.email === '') || (this.psw === '') || (this.pswRpt === '')) {
//     // eslint-disable-next-line no-alert
//     alert('Заполните все  поля!');
//   } else if (!re.test(this.email)) {
//     // eslint-disable-next-line no-alert
//     alert('Введите корректный email');
//   } else {
//     // eslint-disable-next-line no-alert
//     alert('успешная регистрация!');
//   }
//   this.email = '';
//   this.psw = '';
//   this.pswRpt = '';
// },

</script>

<style scoped>

 input[type=password], input[type=email]  {
  width: 30%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.registerbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 30%;
  opacity: 0.9;
}

</style>
