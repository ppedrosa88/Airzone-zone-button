import useZoneStore from "../../zoneButton/store/zonesStore";
import { storeToRefs } from "pinia";

const useZones = (zonesFromDb) => {

    const store = useZoneStore();
    const { zones } = storeToRefs(store);
    const { addNewZone } = store

    store.zones = zonesFromDb

    return {
        zones,

        addZone: (zone) => addNewZone(zone),
    }
}

export default useZones