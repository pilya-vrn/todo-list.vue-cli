<template>
   <div>
      <form @submit.prevent="createTask()">
        <input type="text" placeholder="Новая задача"
         @input="onInput" v-bind:value="title" >
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
  methods: {
    createTask() {
      if (this.title.trim() === '') {
        // eslint-disable-next-line no-alert
        alert('title не должен быть пустым');
      } else {
        this.$emit('create', this.title.trim());
        this.title = '';
        // eslint-disable-next-line no-console
        console.log(this.title);
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
