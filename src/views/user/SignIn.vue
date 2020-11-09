<template>
  <form class="container" @submit="signIn">
    <h1>Вход в систему</h1>

    <div class="container signin">
    <p>Незарегистрированны? <router-link to="signup">Зарегистрироваться</router-link>.</p>
    <!-- сделать ссылку на страницу регистрации-->
    </div>

    <p>Пожалуйста, заполните поля для входа</p>
    <hr>

    <label for="email"><b>Email</b></label>
    <p>
    <input type="email" placeholder="example@gmail.com"
    name="email" maxlength="33" required v-model="email" >
    <p>

    <label for="psw"><b>Введите пароль</b></label>
    <p>
    <input type="password" placeholder="Введите пароль"
    name="psw" maxlength="33" required v-model="psw">
    <p>

    <hr>
    <button type="submit" class="registerbtn" >
      Войти!</button>
  </form>

</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      psw: '',
    };
  },
  methods: {
    signIn() {
      const re = /\S+@\S+\.\S+/;

      if ((this.email === '') || (this.psw === '')) {
        // eslint-disable-next-line no-alert
        alert('Заполните все  поля!');
      } else if (!re.test(this.email)) {
        // eslint-disable-next-line no-alert
        alert('Введите корректный email');
      } else {
        // eslint-disable-next-line no-alert
        alert('Добро пожаловать');
      }
      this.email = '';
      this.psw = '';
    },
    // проверка логина и пароля
  },
};
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
