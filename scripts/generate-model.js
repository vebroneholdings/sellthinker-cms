'use strict';

/*
 * Writes the component and content-type schemas from scripts/content-model.js.
 * Run with `npm run model`, then restart `npm run develop`.
 */

const fs = require('fs');
const path = require('path');
const { elements, blocks, meta, contentTypes } = require('./content-model');

const ROOT = path.join(__dirname, '..');
const write = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
};

function writeComponents(category, defs) {
  for (const [name, def] of Object.entries(defs)) {
    write(path.join(ROOT, 'src', 'components', category, `${name}.json`), {
      collectionName: `components_${category}_${name.replace(/-/g, '_')}s`,
      info: { displayName: def.displayName, icon: def.icon, description: def.description || '' },
      options: {},
      attributes: def.attributes,
    });
  }
  console.log(`${category}: ${Object.keys(defs).length} components`);
}

const factoryFile = (kind, uid) =>
  `/**\n * ${uid.split('.').pop()} ${kind}\n */\n\nimport { factories } from '@strapi/strapi';\n\nexport default factories.createCore${kind[0].toUpperCase() + kind.slice(1)}('${uid}');\n`;

function writeContentTypes() {
  for (const [name, def] of Object.entries(contentTypes)) {
    const dir = path.join(ROOT, 'src', 'api', name);
    write(path.join(dir, 'content-types', name, 'schema.json'), { ...def, pluginOptions: {} });
    const uid = `api::${name}.${name}`;
    for (const [kind, folder] of [['router', 'routes'], ['controller', 'controllers'], ['service', 'services']]) {
      const file = path.join(dir, folder, `${name}.ts`);
      if (!fs.existsSync(file)) {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, factoryFile(kind, uid));
      }
    }
  }
  console.log(`content types: ${Object.keys(contentTypes).join(', ')}`);
}

writeComponents('elements', elements);
writeComponents('blocks', blocks);
writeComponents('meta', meta);
writeContentTypes();
