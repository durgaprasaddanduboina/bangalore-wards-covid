export const MAP_TYPES = {
  COUNTRY: 'country',
  STATE: 'state',
  DISTRICT: 'district',
  ZONES: 'ZONE',
  BLOCKS: 'block'
};
 
export const MAPS_DIR = './maps';
 
export const mapMeta = {
  'Rajasthan_District': {
    name: 'Rajasthan_District',
    geoDataFile: `${MAPS_DIR}/Rajasthan_District.json`,
    mapType: MAP_TYPES.STATE,
    graphObjectName: 'Rajasthan_District',
    center: [26.922070, 75.778885],
    viewBox: [0, -100, 1000, 550],
    scale: 8000
  },
  'Wards': {
    name: 'Wards',
    geoDataFile: `${MAPS_DIR}/Wards.json`,
    mapType: MAP_TYPES.STATE,
    graphObjectName: 'Wards',
    center: [26.922070, 75.778885],
    viewBox: [0, -100, 1000, 550],
    scale: 8000
  }
};
 
export const initialMap = mapMeta['Wards'];