const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, '..', 'node_modules', '.cache');

fs.rmSync(cachePath, { recursive: true, force: true });
