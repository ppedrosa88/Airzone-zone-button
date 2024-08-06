<script setup>
import useConfigTemp from "./composables/useConfigTemp";

import PowerIcon from "./assets/icons/PowerIcon.vue";
import HeatIcon from "./assets/icons/HeatIcon.vue";
import CoolIcon from "./assets/icons/CoolIcon.vue";
import useZoneStore from "./store/zonesStore";

const props = defineProps({
  isOn: Boolean,
  setPointTemperature: Number,
  roomTemperature: Number,
  roomName: String,
  statusClass: String,
  statusText: String,
  roomId: String,
});

const emits = defineEmits(["pushTo"]);

const { statusClass, statusText, toggleZone, pushTo } = useConfigTemp(props);

const zonesStore = useZoneStore();

const { setActivate } = zonesStore;
</script>

<template>
  <transition name="status-change" mode="out-in">
    <div
      class="zone-button"
      :class="statusClass"
      @click.stop="emits('pushTo')"
      :key="statusClass"
    >
      <p class="zone-temperature">{{ props.roomTemperature }}º</p>
      <div class="zone-info">
        <p class="zone-name">{{ props.roomName }}</p>
        <p class="zone-status">{{ statusText }}</p>
      </div>
      <button class="zone-off" @click.stop="() => setActivate(props.roomId)">
        <PowerIcon color="#9AA5B1" />
      </button>
      <div class="zone-icon" v-if="isOn">
        <div v-if="statusClass === 'heating'">
          <HeatIcon />
        </div>
        <div v-if="statusClass === 'cooling'">
          <CoolIcon />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
$bg-color: #ffffff;

.zone-button {
  position: relative;
  height: 130px;
  padding: 17px 13px;
  border-radius: 10px;
  background-color: $bg-color;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.34);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Roboto Medium", sans-serif;
  overflow: hidden;

  & .zone-temperature {
    font-size: 33px;
    color: #7b8794;
    line-height: 30px;
    font-family: inherit;
  }

  & .zone-name {
    font-size: 16px;
    color: #1f2933;
  }

  & .zone-status {
    font-size: 13px;
    color: #9aa5b1;
  }

  .zone-off {
    top: 0;
    width: 55px;
    height: 55px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #cbd2d9;

    & .power {
      height: 24px;
    }
  }
  & .zone-name,
  & .zone-status {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.zone-button.heating {
  background-image: radial-gradient(
    farthest-corner at 0% 0%,
    #ef694e 0%,
    #cf1e11 100%
  );
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.34);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  & .zone-off {
    color: #ffc8bd;
  }

  & .zone-temperature {
    color: #ffffff;
  }

  & .zone-name {
    color: #ffffff;
  }

  & .zone-status {
    color: #ffc3bd;
  }

  & .zone-icon {
    width: 110px;
    position: absolute;
    bottom: -30px;
    right: -45px;
    color: rgba($color: #ffffff, $alpha: 0.08);

    animation: spinOpacity 30s linear infinite;
  }
}

.zone-button.cooling {
  background-image: radial-gradient(
    farthest-corner at 0% 0%,
    #40c3f7 0%,
    #0b69a3 100%
  );
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.34);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  & .zone-off {
    color: #b3ecff;
  }

  & .zone-temperature {
    color: #ffffff;
  }

  & .zone-name {
    color: #ffffff;
  }

  & .zone-status {
    color: #b3ecff;
  }

  & .zone-icon {
    width: 110px;
    position: absolute;
    bottom: -45px;
    right: -45px;
    color: rgba($color: #ffffff, $alpha: 0.06);

    animation: spinOpacity 30s linear infinite;
  }
}

.zone-button.comfort {
  background-image: radial-gradient(
    farthest-corner at 3% 1%,
    #2dcc9a 0%,
    #01644f 100%
  );
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.22), 0 1px 2px 0 rgba(0, 0, 0, 0.34);
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  & .zone-off {
    color: #c6f7e5;
  }

  & .zone-temperature {
    color: #ffffff;
  }

  & .zone-name {
    color: #ffffff;
  }

  & .zone-status {
    color: #c6f7e5;
  }

  & .zone-icon {
    width: 110px;
    position: absolute;
    bottom: -30px;
    right: -45px;
    color: rgba($color: #ffffff, $alpha: 0.06);

    animation: spinOpacity 45s linear infinite;
  }
}

.zone-off {
  background-image: none;
  transition: background-color 1s ease-in-out, box-shadow 1s ease-in-out;
}

.status-change-enter-active {
  transition: all 0.3s ease-in-out;
  animation: fade-in 0.3s ease-in-out;
}

.status-change-leave-active {
  transition: all 0.3s ease-in-out;
  animation: fade-out 0.3s ease-in-out;
}

.status-change-enter,
.status-change-leave-to {
  animation: fade-out 0.3s ease-in-out;
}

@keyframes spinOpacity {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  10% {
    opacity: 0.6;
  }
  25% {
    opacity: 1;
  }
  35% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.5;
  }
  60% {
    opacity: 0.75;
  }
  75% {
    opacity: 1;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.8;
    transform: rotate(360deg);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.2;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}
</style>
