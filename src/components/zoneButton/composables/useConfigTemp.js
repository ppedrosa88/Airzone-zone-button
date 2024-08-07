import { ref, watch } from "vue";
import useZoneStore from "../store/zonesStore";

const useConfigTemp = (props) => {

    const zonesStore = useZoneStore()
    const { setActivate, changeTemp, changeMode } = zonesStore

    const modeMutation = ref("");
    const statusText = ref("");

    const updateModeMutation = () => {
        if (props?.mode === 'heat') {
            changeMode(props?.roomId, 'heat')
            modeMutation.value = 'heating'
        } else if (props?.mode === 'cool') {
            changeMode(props?.roomId, 'cool')
            modeMutation.value = 'cooling'
        } else if (props?.mode === 'confort') {
            changeMode(props?.roomId, 'confort')
            modeMutation.value = 'comfort'
        } else {
            modeMutation.value = ''
        }
    }

    const updateStatusText = () => {
        if (!props || props.isOn === undefined || props.roomTemperature === undefined || props.setPointTemperature === undefined || props.mode === undefined) {
            statusText.value = "OFF";
            return;
        }

        if (!props.isOn) {
            changeMode(props.roomId, '')
            statusText.value = "OFF";
        } else if (props.roomTemperature < props.setPointTemperature) {
            changeMode(props.roomId, 'heat')
            statusText.value = `Heating to ${props.setPointTemperature}°`;
        } else if (props.roomTemperature > props.setPointTemperature) {
            changeMode(props.roomId, 'cool')
            statusText.value = `Cooling to ${props.setPointTemperature}°`;
        } else {
            changeMode(props.roomId, 'confort')
            statusText.value = "Comfort";
        }
    };

    const updateModeText = () => {
        if (!props || props.isOn === undefined || props.roomTemperature === undefined || props.setPointTemperature === undefined || props.mode === undefined) {
            statusText.value = "OFF";
            return;
        }

        if (!props.isOn) {
            statusText.value = "OFF";
        } else if (props.mode === 'heat') {
            statusText.value = `Heating to ${props.setPointTemperature}°`;
        } else if (props.mode === 'cool') {
            statusText.value = `Cooling to ${props.setPointTemperature}°`;
        } else {
            statusText.value = "Comfort";
        }
    };

    watch(
        () => [props?.roomTemperature, props?.setPointTemperature, props?.isOn],
        updateStatusText,
        { immediate: true }
    );

    watch(
        () => [props?.mode],
        updateModeMutation,
        { immediate: true }
    );

    watch(
        () => [props?.mode],
        updateModeText,
        { immediate: true }
    );

    const updateActivation = () => {
        if (!props?.isOn) {
            modeMutation.value = ''
        }
    }

    watch(
        () => [props?.isOn, props?.setPointTemperature],
        updateActivation,
        { immediate: true }
    );


    return {
        statusText,
        modeMutation,

        toggleZone: (id) => setActivate(id),
        changeTemperature: (zoneId, temp) => changeTemp(zoneId, temp),
        changeModeManual: (zoneId, mode) => changeMode(zoneId, mode)
    }
}

export default useConfigTemp