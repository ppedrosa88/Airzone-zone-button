import { computed } from "vue";
import useZoneStore from "../store/zonesStore";



const useConfigTemp = (props) => {

    const zonesStore = useZoneStore()

    const { setActivate, changeTemp } = zonesStore

    const statusClass = computed(() => {
        if (!props.isOn) {
            return "zone-off";
        }

        if (props.roomTemperature < props.setPointTemperature) {
            return "heating";
        } else if (props.roomTemperature > props.setPointTemperature) {
            return "cooling";
        } else {
            return "comfort";
        }
    });

    const statusText = computed(() => {
        if (!props.isOn) {
            return "OFF";
        }

        if (props.roomTemperature < props.setPointTemperature) {
            return "Heating to " + props.setPointTemperature + "°";
        } else if (props.roomTemperature > props.setPointTemperature) {
            return "Cooling to " + props.setPointTemperature + "°";
        } else if (props.roomTemperature === props.setPointTemperature) {
            return "Comfort";
        }
    });


    return {
        statusClass,
        statusText,

        toggleZone: (id) => { setActivate(id) },
        pushTo: () => { console.log("pushTo") },
        changeTemperature: (zoneId, temp) => changeTemp(zoneId, temp)

    }
}

export default useConfigTemp