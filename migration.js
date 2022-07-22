const fs = require('fs');

const databasename = 'marvel-now-2.0';

fs.readFile(`./src/database/db/${databasename}/volumes.json`, 'utf8', (_, volumesData) => {
  fs.readFile(`./src/database/db/${databasename}/notebooks.json`, 'utf8', (__, notebooksData) => {
    const result = {};
    const { volumes, meta } = JSON.parse(volumesData);
    const { notebooks } = JSON.parse(notebooksData);
    const volumesKeys = Object.keys(volumes);

    volumesKeys.forEach((key) => {
      const { notebooks_ids: notebooksIds, ...volume } = volumes[key];
      const notebooksUrls = notebooksIds.map((id) => {
        const notebook = notebooks[id];
        return `${notebook.title} Vol ${notebook.vol} ${notebook.no}`.replaceAll(' ', '_');
      });
      result[key] = { ...volume, notebooks: notebooksUrls };
    });

    const resultString = JSON.stringify({ volumes: result, meta }, null, 2);

    fs.writeFile(
      `./src/database/db/${databasename}/volumes-m.json`,
      resultString.replace(/\s+(?=[^[\]]*\])/gm, ''),
      () => {}
    );
  });
});
