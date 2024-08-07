<script setup>
import { ref } from 'vue';

const emits = defineEmits(["close", "addNewZone"]); 
const newZoneName = ref("");

const close = () => emits("close");
const addNewZone = () => emits("addNewZone", newZoneName.value);

</script>
<template>
    <div class="modal-container" @click="close">
      <div class="modal" @click.stop>
        <p>Add new zone</p>
        <form @submit.prevent="addNewZone">
          <input v-model="newZoneName" type="text" placeholder="Zone name" />
          <button type="submit">Add zone</button>
        </form>
        <div class="close" @click="close">
          <img src="../assets/close-outline.svg" alt="close">
        </div>
      </div>  
    </div>
</template>


<style lang="scss" scoped>

.modal-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.modal {
  z-index: 10;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  width: 300px;

  & p {
    font-size: 24px;
    margin-bottom: 40px;
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  & input {
    font-size: 16px;
    padding: 5px 10px;
    border: 1px solid #052A3A;
    border-radius: 10px;
    outline: none;
    margin-bottom: 20px;

    &:focus {
      border: 1px solid #087395;
    }

  }

  & button {
    font-size: 16px;
    padding: 5px 30px;
    border-radius: 10px;
    border: none;
    background-color: #052A3A;
    color: white;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
  }

  & button:hover {
    background-color: #087395;
  }

  & button:active {
    background-color: #087395;
    scale: 0.98;
  }

  & .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 24px;
      height: 24px;
    }
  }

}
</style>