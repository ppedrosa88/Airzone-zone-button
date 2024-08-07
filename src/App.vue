<script setup>
import { computed, ref } from "vue";

import { zones as zonesFromDd } from "./db/db";

import AddZoneModal from "./components/AddZoneModal.vue";
import ControlModal from "./components/ControlModal.vue";
import ZoneButton from "./components/zoneButton/ZoneButton.vue";
import useZones from "./components/zoneButton/composables/useZones";
import useConfigTemp from "./components/zoneButton/composables/useConfigTemp";

const { zones, addZone } = useZones(zonesFromDd);
const { changeTemperature, toggleZone } = useConfigTemp();

const newZone = ref(false);
const selectedZoneId = ref("")

const selectedZone = computed(() => {
  return zones.value.find(zone => zone.roomId === selectedZoneId.value)
})

const addNewZone = ( newZoneName ) => {
  addZone({...zones.value[0], roomName: newZoneName, roomId: String(zones.value.length + 1)})
  newZone.value = false
}
const selectZone = (roomId) => selectedZoneId.value = roomId
const changeTemp = (zoneId, temp) => changeTemperature(zoneId, temp)
const setOnOff = (zoneId) => toggleZone(zoneId)

</script>

<template>
  <div class="container">
    <div class="logo"><img src="/public/airzone.svg" alt="AirzoneLogo"></div>
    
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
        :mode="zone.mode"
        @pushTo="() => selectZone(zone.roomId)"
        />
    </div>

    <AddZoneModal 
      v-if="newZone" @close="() => newZone = !newZone" 
      @addNewZone="addNewZone"
    />

    <ControlModal 
      v-if="selectedZoneId" 
      :selectedZone="selectedZone"
      @close="() => selectedZoneId = ''"
      @changeTemperature="changeTemp"
      @setOnOff="setOnOff"
      />

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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
  &  p {
    font-size: 24px;
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
  &  button:active {
    background-color: #087395;
    scale: 0.98;
  }

}

.logo {
  height: 30px;

  & img {
    width: 100%;
    height: 100%;
  }
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
