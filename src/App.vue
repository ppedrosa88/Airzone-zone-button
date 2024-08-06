<script setup>
import { computed, ref } from "vue";
import ZoneButton from "./zoneButton/ZoneButton.vue";
import useZones from "./zoneButton/composables/useZones";
import { zones as zonesFromDd } from "./db/db";
import useConfigTemp from "./zoneButton/composables/useConfigTemp";

const { zones, addZone } = useZones(zonesFromDd);
const { changeTemperature } = useConfigTemp();

const newZone = ref(false);
const selectedZone = ref("")

const newZoneName = ref()
const addNewZone = () => {
  addZone({...zones.value[0], roomName: newZoneName.value, roomId: String(zones.value.length + 1)})
  newZone.value = false
}

const selectZone = (roomId) => {
  selectedZone.value = roomId
}

const selectedZoneName = computed(() => {
  return zones.value.find(zone => zone.roomId === selectedZone.value).roomName
})

</script>

<template>
  <div class="container">
    
    <div class="header">
      <p>My zones</p>
      <button @click="() => newZone = !newZone">Add zone</button>
    </div>
    
    <div class="wrapper">
      <ZoneButton
      v-for="zone in zones"
      :key="zone.roomId"
      :isOn="zone.isOn"
      :setPointTemperature="zone.setPointTemperature"
        :roomTemperature="zone.roomTemperature"
        :roomName="zone.roomName"
        :roomId="zone.roomId"
        @pushTo="() => selectZone(zone.roomId)"
        />
    </div>

    <div v-if="newZone" class="modal-body">
      <div class="modal">
        <p>Add new zone</p>
        <form @submit.prevent="addNewZone">
          <input v-model="newZoneName" type="text" placeholder="Zone name" />
          <button type="submit">Add zone</button>
        </form>
        <div class="close" @click="() => newZone = !newZone">
          <img src="./assets/close-outline.svg" alt="close">
        </div>
      </div>  
    </div>
    <div class="modal-body" v-if="selectedZone" @click.stop="() => selectedZone = ''">
      <div class="control-modal" @click.stop>
        <button class="control-button" @click="changeTemperature( selectedZone, -1)">-1</button>
        <p>{{ selectedZoneName }}</p>
        <button class="control-button" @click="changeTemperature( selectedZone, 1)">+1</button>
      </div>
      <div class="close" @click="() => selectedZone = ''">
        <img src="./assets/close-outline.svg" alt="close">
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}

.container {
  position: relative;
  padding: 30px;
}

.modal-body{
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
}

.header p {
  font-size: 24px;
}

.header button {
  font-size: 16px;
  padding: 5px 30px;
  border-radius: 10px;
  border: none;
  background-color: #052A3A;
  color: white;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
}

.header button:hover {
  background-color: #087395;
}

.header button:active {
  background-color: #087395;
  scale: 0.98;
}


.control-modal {
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  position: relative;

  & p {
    font-size: 24px;
  }

  & button {
    font-size: 16px;
    padding: 15px 20px;
    border-radius: 10px;
    border: none;
    background-color: #fff;
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
  }

  & button:hover {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.32) inset, 0 1px 2px 0 rgba(0, 0, 0, 0.44) inset;
    transition: box-shadow 0.3s ease-in-out;
  }

  & button:active {
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

.control-button {
  font-size: 16px;
  padding: 15px 20px;
  border-radius: 10px;
  border: none;
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.control-button:hover {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.32) inset, 0 1px 2px 0 rgba(0, 0, 0, 0.44) inset;
  transition: box-shadow 0.3s ease-in-out;
}

.control-button:active {
  scale: 0.98;
}

@media screen and (max-width: 640px) {
  .container {
  
    padding: 15px;
  }
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 640px) and (max-width: 1024px) {
  .wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
