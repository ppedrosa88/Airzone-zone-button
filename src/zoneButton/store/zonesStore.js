import { ref } from 'vue';
import { defineStore } from 'pinia';

const useZoneStore = defineStore('zone', () => {

    const zones = ref([])

    const setActivate = (zoneId) => {
        zones.value = zones.value.map(zone => {
            if (zone.roomId === zoneId) {
                return { ...zone, isOn: !zone.isOn };
            }
            return zone
        })
    }

    const changeTemp = (zoneId, temp) => {
        zones.value = zones.value.map(zone => {
            if (zone.roomId === zoneId) {
                console.log(zone.roomTemperature)
                return { ...zone, setPointTemperature: zone.setPointTemperature + temp };
            }
            return zone
        })
    }



    return {
        // State properties
        zones,

        // Actions
        setZones: (zones) => zones.value = zones,
        setActivate: (zoneId) => setActivate(zoneId),
        addNewZone: (zone) => zones.value.push(zone),
        changeTemp: (zoneId, temp) => {
            changeTemp(zoneId, temp)
        },

    }
})

export default useZoneStore