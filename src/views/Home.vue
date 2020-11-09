<template>
  <div class="home">
     <div style="width: 400px; margin: auto">

              <CreateList
                v-if="showForm"
                @closeModal="showForm = false"
                @createList="createList($event)"
              />

              <TasksList
                v-for="list in lists"
                v-bind:key="list.id"
                v-bind:title="list.title"
                v-bind:id="list.id"
              />
              <p></p>
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
    createList(listTitle) {
      this.$store.commit('createList', {
        title: listTitle,
        id: `id${(new Date()).getTime()}`,
      });
    },
  },
};
</script>

<style scoped>

</style>
