const fs = require('fs');
const path = require('path');
const iconMeta = require('../src/Icon/fonts/selection.json');
const { icons } = iconMeta || {};
const iconNames = icons.map(i => i?.properties?.name);

fs.writeFileSync(path.resolve(__dirname, '../src/Icon/names.js'), `export default ${JSON.stringify(iconNames)}`);
