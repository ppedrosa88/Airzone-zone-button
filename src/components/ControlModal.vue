<script setup>
import useConfigTemp from './zoneButton/composables/useConfigTemp';


const emits = defineEmits(["close", "changeTemperature", 'setOnOff']);

const props = defineProps({
    selectedZone: {
      isOn: Boolean,
      setPointTemperature: Number,
      roomTemperature: Number,
      roomName: String,
      mode: String,
      roomId: String,
    },
})

const {changeModeManual} = useConfigTemp()

const changeTemp = (zoneId, temp) => emits("changeTemperature", zoneId, temp)
const close = () => emits("close");
const changePowerStatus = (zoneId) => emits('setOnOff', zoneId)

</script>
<template>
    <div class="modal-container" @click="close">
      <div class="control-modal" @click.stop>
        <div class="display">
          <h2>{{ props.selectedZone.roomName }}</h2>
          <div class="display-info">
            <p><span>AMBIENT TEMP</span> {{ props.selectedZone.roomTemperature }}</p>
            <p><span>SET TEMP</span> {{ props.selectedZone.setPointTemperature }}</p>
          </div>
          <div class="display-mode">

            <img v-if="props.selectedZone.mode === 'heat'" src="../components/zoneButton/assets/icons/heat.svg" alt="heat">
            <img v-if="props.selectedZone.mode === 'cool'" src="../components/zoneButton/assets/icons/cool.svg" alt="cool">
            <img v-if="props.selectedZone.mode === 'confort'" src="../assets/c-48.png" alt="confort"/>
            
          </div>
        </div>
      
        <div class="tiny-logo"><img src="/public/airzone.svg" alt="AirzoneLogo"></div>
        <button class="control-button" @click="changePowerStatus( props.selectedZone.roomId )"><img src="../components/zoneButton/assets/icons/power.svg" alt=""></button>

        <div class="btn-group">
          <button class="control-button" @click="changeTemp( props.selectedZone.roomId, -1 )">-</button>
          <button class="control-button" @click="changeTemp( props.selectedZone.roomId, 1 )">+</button>
        </div>
        <div class="btn-group">
          <button class="control-button" @click="changeModeManual( props.selectedZone.roomId, 'heat' )"> <img src="./zoneButton/assets/icons/heat.svg" alt="heat"> </button>
          <button class="control-button" @click="changeModeManual( props.selectedZone.roomId, 'confort' )"> <img src="../assets/c-48.png" alt="confort"> </button>
          <button class="control-button" @click="changeModeManual( props.selectedZone.roomId, 'cool' )"> <img src="./zoneButton/assets/icons/cool.svg" alt="cool"> </button>
        </div>
        <div class="btn-group">
        </div>
        <div class="close" @click="close">
          <img src="../assets/close-outline.svg" alt="close">
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>

.modal-container{
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

.tiny-logo{
  width: 50px;
   & img {
    width: 100%;
    height: 100%;
   }
}

.control-modal {
  min-width: 300px;
  padding: 30px;
  padding-top: 50px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  
  
  & .display{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: #e1e1e1;
    border-radius: 10px;
    padding: 10px;
    position: relative;

    & .display-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    & p {
      font-size: 24px;

      & span {
        font-size: 10px;
      }

    }
  }

  & .btn-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  & button {
    width: 60px;
    height: 60px;
    font-size: 30px;
    border-radius: 5px;
    border: none;
    background-color: #fff;
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
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
  padding: 10px 15px;
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

.display-mode {
  position:absolute;
  top: 10px;
  left: 10px;
  width: 20px;
  height: 20px;
   & p {
    font-size: 30px;
   }
}
</style>