<template>
  <div class="home">
     <div style="width: 400px; margin: auto">

              <CreateList
              @createList="createList($event)"
              v-if="showForm"
              @close="showForm = false" />

              <TasksList
              v-for="(list, index) in lists"
              v-bind:key="index"
              v-bind:title="list.title"
              v-bind:tasks="list.tasks"
              @remove="deleteList(index, $event)"
              @create="createTask(index, $event)"
              v-bind:indexList="index"
              @delete="deleteTask(index)" />

              <button @click="showForm = true">Добавить новый лист</button>
      </div>
  </div>
</template>

<script>
import CreateList from '@/components/CreateList.vue';
import TasksList from '@/components/TasksList.vue';

export default {
  name: 'Home',
  components: {
    CreateList, TasksList,
  },
  data() {
    return {
      showForm: false,
      lists: [],
    };
  },
  methods: {
    deleteTask(index) {
      const list = this.lists[index];
      list.tasks.splice(index, 1);
    },
    createTask(index, title) {
      const list = this.lists[index];
      list.tasks.unshift({ title, checked: false });
    },
    createList(title) {
      this.lists.push({
        title,
        tasks: [],
      });
      this.showForm = false;
    },
    deleteList(index) {
      this.lists.splice(index, 1);
    },
  },
};
</script>
<style scoped>
</style>
