<template>
  <div class="brd">
    <h2>Название листа: {{ title }}</h2>
    <button @click="deleteList" style="background-color: rgb(202, 58, 58)">Удалить лист</button>
    <h3>  </h3>
              <CreateTask
              @create="createTask" />

              <Task
              v-for="task in tasks"
              v-bind:key="task.id"
              v-bind:title="task.task.title"
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
      this.$store.dispatch('deleteList', {
        listId: this.id,
      });
    },
    createTask(taskTitle) {
      this.$store.dispatch('createTask', {
        listId: this.id,
        taskTitle,
        checked: false,
      });
      // console.log(this.id);
    },
    deleteTask(taskIndex) {
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

.brd {
    border: 4px double black; /* Параметры границы */
    background: rgb(145, 228, 214); /* Цвет фона */
    padding: 5px; /* Поля вокруг текста */
   }
</style>
