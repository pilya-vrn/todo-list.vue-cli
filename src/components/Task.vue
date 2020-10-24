<template>
  <div>
            <h3>
              <input type="checkbox" v-model="checked" >
              <label for="checkbox" v-bind:class="{ 'completed': checked }">{{ checked }}</label>
              {{title}}
              <button v-on:click="deleteTask()">Удалить</button>
            </h3>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['title', 'checked'],
  // data() {
  //   return { isActive: true };
  // },
  methods: {
    deleteTask() {
      this.$emit('delete');
    },
  },
};
</script>

<style scoped>
.completed {
  background-color: rgb(39, 224, 39);
}

</style>
