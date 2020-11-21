<template>
  <div>
            <h3>
              <input type="checkbox" v-bind:checked="checked" @change="onChange">
              <label v-bind:class="{ 'completed': checked }">
              {{ title }}
              </label>
              <button @click="deleteTask()">Удалить</button>
            </h3>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: ['title', 'checked'],
  methods: {
    deleteTask() {
      this.$emit('delete');
    },
    onChange() {
      // console.log('gggg');
      this.$emit('change', !this.checked);
    },
  },
};
</script>

<style scoped>

.completed {
  background-color: rgb(39, 224, 39);
}

</style>
