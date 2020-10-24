<template>
  <div>
            <div>
                <h3>
                <input type="checkbox" v-model="checked">
                <label for="checkbox">{{ checked }}</label>
                {{title}}
                </h3>
            </div>
            <button v-on:click="deleteTask()">Удалить</button>
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
  },
};
</script>

<style scoped>

</style>
