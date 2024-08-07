## Project Description

`airzone-zone-button` is a development test for a component called `zoneButton`, intended to be part of the Airzone application.

## Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/ppedrosa88/Airzone-zone-button
   cd airzone-zone-button

   ```

2. **Install Dependencies**

   `npm install`

   Or with Yarn:

   `yarn install`

## Proyect Usage

### Development

Start the development server:

`npm run dev`

Or with Yarn:

`yarn dev`

### Build

Build the application for production:

`npm run build`

Or with Yarn:

`yarn build`

### Preview

Preview the built version:

`npm run preview`

Or with Yarn:

`yarn preview`

## Dependencies

- `pinia`: ^2.2.0
- `sass`: ^1.77.8
- `sass-loader`: ^16.0.0
- `vue`: ^3.4.31

### Development Dependencies

- `@vitejs/plugin-vue`: ^5.0.5
- `vite`: ^5.3.4

# `zoneButton` Component Documentation

The `zoneButton` component is designed to display and control individual climate zones within the Airzone application. It integrates with Vue and uses Pinia for state management.

The `zoneButton` component has been designed with flexibility in mind, allowing the store to be quickly upgraded if required. This design approach follows similar principles to a hexagonal architecture, where the core functionality of the component is separated from external concerns, making it easy to adapt and extend. This modular structure ensures that changes to the shop or integration with other components can be made quickly and efficiently, while keeping the code clean and easy to maintain.

## Dependencies

To use the `zoneButton` component, you need to have [Pinia](https://pinia.vuejs.org/) installed and configured, as it manages the state related to zones.

## Basic Setup

1. **Import and Register**: Ensure that you import the `zoneButton` component and the necessary composables for state management.

2. **State Management**: The component relies on Pinia for state management. Set up Pinia to handle the state of zones.

3. **Provide Zones Array**: The `zoneButton` component requires an array of zones to be passed in. Each zone object should include properties such as `roomId`, `isOn`, `setPointTemperature`, `roomTemperature`, `roomName`, and `mode`.

## Props

The `zoneButton` component accepts the following props:

- **`isOn`** (`Boolean`): Indicates if the zone is currently active (on).
- **`setPointTemperature`** (`Number`): The desired temperature set for the zone.
- **`roomTemperature`** (`Number`): The current temperature of the room.
- **`roomName`** (`String`): The name of the zone or room.
- **`mode`** (`String`): The current mode of the zone (e.g., "Heating", "Cooling").
- **`roomId`** (`String`): Unique identifier for the zone.

## Events

- **`pushTo`**: Emitted when the button is clicked. Use this event to select the zone for further actions or display additional information.

## Functions

Here are the primary functions available for configuration:

- **`changeTemperature(zoneId, temp)`**: Changes the temperature setting for the specified zone.

  - **Parameters**:
  - `zoneId` (`String`): The unique identifier of the zone.
  - `temp` (`Number`): The new temperature to set.

- **`toggleZone(zoneId)`**: Toggles the on/off state of the specified zone.
  - **Parameters**:
  - `zoneId` (`String`): The unique identifier of the zone.

## Usage Example

In your Vue component, you can use the `zoneButton` as follows:

```
<template>
  <div>
    <zone-button
      v-for="zone in zones"
      :key="zone.roomId"
      :isOn="zone.isOn"
      :setPointTemperature="zone.setPointTemperature"
      :roomTemperature="zone.roomTemperature"
      :roomName="zone.roomName"
      :roomId="zone.roomId"
      :mode="zone.mode"
      @pushTo="handleZoneSelection"
    />
  </div>
</template>

<script setup>
import { useZones } from './composables/useZones'; // Adjust import based on your file structure
import ZoneButton from './components/zoneButton/ZoneButton.vue';

const { zones, addZone } = useZones(zonesFromDd);
const { changeTemperature, toggleZone } = useConfigTemp();

const handleZoneSelection = (zoneId) => {
  // Handle the selected zone
};

</script>
```
