<template>
  <div>
            <h3>
              <input type="checkbox" v-bind:checked="checked" @change="onChange">
              <label v-bind:class="{ 'completed': checked }">
                {{ title }}
              </label>
              <button v-on:click="deleteTask()">Удалить</button>
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
