<template>
   <div>
      <form v-on:submit.prevent="createTask()">
        <input type="text" placeholder="Новая задача"
         v-on:input="onInput" v-bind:value="title" >
        <button>Добавить</button>
      </form>
   </div>
</template>

<script>
export default {
  name: 'CreateTask',
  data() {
    return {
      title: '',
    };
  },
  mounted() {},
  methods: {
    createTask() {
      if (this.title === '') {
        alert('title не должен быть пустым');
      } else {
      // TODO: add validation, очистка формы
        this.$emit('create', this.title);
        this.title = '';
      }
    },
    onInput(evt) {
      this.title = evt.target.value;
    },
  },
};
</script>

<style scoped>

</style>
