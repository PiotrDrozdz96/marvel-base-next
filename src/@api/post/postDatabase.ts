'use server';

import fs from 'fs';
import copydir from 'copy-dir';

import messages from 'utils/apiValidators/apiValidators.messages';
import { interpolate } from 'utils/interpolate';

const postDatabase = async (databaseName: string, body: { name: string }) =>
  new Promise((resolve) => {
    if (databaseName && !fs.existsSync(`src/database/db/${databaseName}`)) {
      throw new Error(interpolate(messages.notFound, { id: databaseName, baseName: 'db' }));
    }

    const name = body.name.toLowerCase().replace(/\s/g, '-');

    if (fs.existsSync(`src/database/db/${name}`)) {
      throw new Error(interpolate(messages.conflict, { id: name, basename: 'db' }));
    }

    if (databaseName) {
      fs.rename(`src/database/db/${databaseName}`, `src/database/db/${name}`, (err) => {
        if (err) {
          throw err;
        }
        resolve({ name });
      });
    } else {
      copydir(
        'src/consts/emptyDatabase',
        `src/database/db/${name}`,
        {
          utimes: false,
          mode: false,
          cover: true,
        },
        (err: unknown) => {
          if (err) {
            throw err;
          }
          resolve({ name });
        }
      );
    }
  });

export default postDatabase;
