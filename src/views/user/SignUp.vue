<template>
  <div class="container">
    <h1>Регистрация</h1>

    <div class="container signin">
    <p>Уже зарегистрированны? <a href="#">Войти</a>.</p>
    <!-- сделать ссылку на страницу входа -->
  </div>

    <p>Пожалуйста, заполните поля для регистрации</p>
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

    <label for="psw-repeat"><b>Повторите пароль</b></label>
    <p>
    <input type="password" placeholder="Повторите пароль"
    name="psw-repeat" maxlength="33" required>
    <p>
    <hr>
    <button type="submit" class="registerbtn" @click="checkValidity">
      Зарегистрироваться!</button>
  </div>

</template>

<script>
export default {
  name: 'SignUp',
  methods: {
    checkValidity() {
      const inputs = document.querySelectorAll('input');
      const email = inputs[0];
      const psw = inputs[1];
      const pswRpt = inputs[2];
      if ((psw.value !== pswRpt.value) || (email.value === '')
      || (psw.value === '') || (pswRpt.value === '')) {
        // eslint-disable-next-line no-alert
        alert('Пароли не совпадают или не заполнены поля!');
      } else {
        // записать данные, перейти на страницу создания тудушек
        // eslint-disable-next-line no-alert
        alert('успешная регистрация!');
      }
      email.value = '';
      psw.value = '';
      pswRpt.value = '';
    },
    onEmailChange() {
      const email = document.querySelectorAll('input')[0];
      const re = /\S+@\S+\.\S+/;
      const text = email.value;

      if (!re.test(text)) {
        email.setCustomValidity('Введите корректный email');
        email.reportValidity();
      } else {
        email.setCustomValidity('');
      }
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
