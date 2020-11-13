<template>
  <div class="home">
     <div style="width: 400px; margin: auto">
       <button style="position: absolute; top: 0; right: 0;">
       <router-link to="signin">Выйти </router-link></button>
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
    createList(title) {
      this.$store.dispatch('createList', {
        title,
        // id: `id${(new Date()).getTime()}`,  айдишник теперь это uid
      });
    },
  },
};
</script>

<style scoped>

</style>
