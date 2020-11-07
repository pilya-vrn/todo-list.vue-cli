<template>
  <div>
    <h2>Название листа: {{ title }}</h2>
    <button @click="deleteList">Удалить лист</button>
<!-- добавить бордер на корневой элемент(див) -->
    <h3>  </h3>
              <CreateTask
              @create="createTask" />

              <Task
              v-for="(task, taskIndex) in tasks"
              v-bind:key="taskIndex"
              v-bind:title="task.title"
              v-bind:checked="task.checked"
              @delete="deleteTask(taskIndex)"
              @change="onTaskChange(taskIndex)" />
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
    deleteList() {
      this.$emit('remove');
    },
    createTask(title) {
      this.$emit('create', title);
    },
    deleteTask(taskIndex) {
      this.$emit('deleteTask', taskIndex);
    },
    onTaskChange(taskIndex) {
      this.$emit('taskChange', taskIndex);
    },
  },
};
</script>

<style scoped>

</style>
