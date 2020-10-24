<template>
  <div class="home">
     <div style="width: 400px; margin: auto">
       <h2>Список задач</h2>
          <div>
            <div>
              <CreateTask v-on:create="add_task($event)" />
              <Task v-for="(task, index) in tasks" v-bind:key="index"
              v-bind:title="task.text" v-bind:checked="task.checked"
              v-on:delete="deleteTask(index)" />
            </div>
          </div>
      </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';
import CreateTask from '@/components/CreateTask.vue';
import Task from '@/components/Task.vue';

export default {
  name: 'Home',
  components: {
    CreateTask, Task,
  },
  data() {
    return { tasks: [] };
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    add_task(title) {
      this.tasks.unshift({ text: title, checked: false });
    },
  },
};
</script>
