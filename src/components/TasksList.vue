<template>
  <div>
    <h2>Название листа: {{ title }}</h2>
    <button @click="deleteList">Удалить лист</button>

    <h3>  </h3>
              <CreateTask
              @create="createTask(index, $event)" />

              <Task
              v-for="(task, index) in tasks"
              v-bind:key="index"
              v-bind:title="task.title"
              v-bind:checked="task.checked"
              @delete="deleteTask(index)" />
              <h1></h1>
  </div>
</template>

<script>
import CreateTask from '@/components/CreateTask.vue';
import Task from '@/components/Task.vue';

export default {
  name: 'TasksList',
  components: { CreateTask, Task },
  props: ['title', 'tasks'],
  methods: {
    deleteList(index) {
      this.$emit('remove', index);
    },
    createTask(title) {
      this.$emit('create', title);
    },
    deleteTask(index) {
      this.$emit('delete');
    },
  },
};
</script>

<style scoped>

</style>
