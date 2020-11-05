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
              @change="onTaskChange(taskIndex, $event)" />
              <h1></h1>
  </div>
</template>

<script>
import CreateTask from '@/components/CreateTask.vue';
import Task from '@/components/Task.vue';

export default {
  name: 'TasksList',
  components: { CreateTask, Task },
  props: ['title', 'id'],
  computed: {
    tasks() {
      return this.$store.state.tasks[this.id];
    },
  },
  methods: {
    deleteList() {
      this.$store.commit('deleteList', {
        listId: this.id,
      });
    },
    createTask(taskTitle) {
      this.$store.commit('createTask', {
        listId: this.id,
        taskTitle,
        checked: false,
      });
    },
    deleteTask(taskIndex) {
      // console.log(taskIndex);
      this.$store.commit('deleteTask', {
        taskIndex,
        listId: this.id,
      });
    },
    onTaskChange(taskIndex, check) {
      this.$store.commit('onTaskChange', {
        taskIndex,
        listId: this.id,
        checked: check,
      });
    },
  },
};
</script>

<style scoped>

</style>
