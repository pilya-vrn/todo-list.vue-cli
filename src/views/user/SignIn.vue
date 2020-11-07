<template>
  <div class="container">
    <h1>Вход в систему</h1>

    <div class="container signin">
    <p>Незарегистрированны? <a href="#">Зарегистрироваться</a>.</p>
    <!-- сделать ссылку на страницу регистрации-->
  </div>

    <p>Пожалуйста, заполните поля для входа</p>
    <hr>

    <label for="email"><b>Email</b></label>
    <p>
    <input type="email" placeholder="example@gmail.com"
    name="email" maxlength="33" required @input="onEmailChange">
    <p>

    <label for="psw"><b>Введите пароль</b></label>
    <p>
    <input type="password" placeholder="Введите пароль"
    name="psw" maxlength="33" required>
    <p>

    <hr>
    <button type="submit" class="registerbtn" @click="SignIn">
      Войти!</button>
  </div>

</template>

<script>
export default {
  name: 'SignIn',
  methods: {
    SignIn() {
      const inputs = document.querySelectorAll('input');
      const email = inputs[0];
      const psw = inputs[1];

      if ((email.value === '') || (psw.value === '')) {
        // eslint-disable-next-line no-alert
        alert('заполните все поля');
      } else {
        // eslint-disable-next-line no-alert
        alert('Добро пожаловать');
      }
      // проверка логина и пароля
    },
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
