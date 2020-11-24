<template>
  <div class="brd">
    <h2>Название листа: {{ title }}</h2>
    <button @click="deleteList" style="background-color: rgb(202, 58, 58)">Удалить лист</button>
    <h3>  </h3>
              <CreateTask
              @create="createTask" />

              <Task
              v-for="task in tasks"
              v-bind:key="task.taskId"
              v-bind:title="task.title"
              v-bind:checked="task.checked"
              :id="task.taskId"
              @delete="deleteTask(task.taskId)"
              @change="onTaskChange(task.taskId, $event)" />
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
      const tasks = this.$store.state.tasks[this.id];
      return tasks;
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
    deleteTask(taskId) {
      this.$store.dispatch('deleteTask', {
        taskId,
        listId: this.id,
      });
    },
    onTaskChange(taskId, check) {
      // console.log('gggg');
      this.$store.dispatch('onTaskChange', {

        taskId,
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
