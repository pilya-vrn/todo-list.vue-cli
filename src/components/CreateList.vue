<template>
  <div class='modal-mask'>
    <div class='modal-wrapper' @click.self="closeModal">
    <form class='modal-container' v-on:submit.prevent="createList(title)">
        <input type="text" placeholder="Название листа"
          v-model="title" >
        <button>Создать</button>
      </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CreateList',
  data() {
    return {
      title: '',
      tasks: [],
    };
  },
  methods: {
    createList() {
      // eslint-disable-next-line no-alert
      if (this.title === '') { alert('title не должен быть пустым'); } else {
        this.$emit('createList', this.title);
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
