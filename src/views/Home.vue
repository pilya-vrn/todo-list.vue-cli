<template>
  <div class="home">
     <div style="width: 400px; margin: auto">

              <CreateList
                @createList="createList($event)"
                v-if="showForm"
                @closeModal="showForm = false"
              />

              <TasksList
                v-for="list in lists"
                v-bind:key="list.id"
                v-bind:title="list.title"
                v-bind:id="list.id"
              />
              <!-- v-bind:tasks="list.tasks"
                @remove="deleteList(listIndex)"
                @create="createTask(listIndex, $event)"
                @deleteTask="deleteTask(listIndex, $event)"
                @taskChange="onTaskChange(listIndex, $event)" -->

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
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    // deleteTask(listIndex, taskIndex) {
    //   const list = this.lists[listIndex];
    //   list.tasks.splice(taskIndex, 1);
    // },
    // createTask(index, title) {
    //   const list = this.lists[index];
    //   list.tasks.unshift({ title, checked: false });
    // },
    createList(listTitle) {
      this.$store.commit('createList', {
        title: listTitle,
        id: `id${(new Date()).getTime()}`,
      });
      // this.lists.push({
      //   title,
      //   tasks: [],
      // });
      // this.showForm = false;
    },
    // deleteList(listIndex) {
    //   this.lists.splice(listIndex, 1);
    // },
    // onTaskChange(listIndex, taskIndex) {
    //   const list = this.lists[listIndex];
    //   list.tasks[taskIndex].checked = !list.tasks[taskIndex].checked;
    // },
  },
};
</script>
<style scoped>
</style>
