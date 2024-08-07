import { ref } from 'vue';
import { defineStore } from 'pinia';

const useZoneStore = defineStore('zone', () => {

    const zones = ref([])

    const setActivate = (zoneId) => {
        zones.value = zones.value.map(zone => {
            return zone.roomId === zoneId
                ? { ...zone, isOn: !zone.isOn }
                : zone
        })
    }

    const changeTemp = (zoneId, temp) => {
        zones.value = zones.value.map(zone => {
            return zone.roomId === zoneId
                ? { ...zone, setPointTemperature: zone.setPointTemperature + temp }
                : zone
        })
    }

    const changeMode = (zoneId, mode) => {
        zones.value = zones.value.map(zone => {
            return zone.roomId === zoneId
                ? { ...zone, mode: mode }
                : zone
        })
    }

    return {
        // State properties
        zones,

        // Actions
        setZones: (zones) => zones.value = zones,
        setActivate: (zoneId) => setActivate(zoneId),
        addNewZone: (zone) => zones.value.push(zone),
        changeTemp: (zoneId, temp) => changeTemp(zoneId, temp),
        changeMode: (zoneId, mode) => changeMode(zoneId, mode)
    }
})

export default useZoneStore