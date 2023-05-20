'use server';

import { revalidatePath } from 'next/cache';

import Resource from 'types/Resource';
import Identifier from 'types/Identifier';

import deleteAlias from './deleteAlias';
import deleteDatabase from './deleteDatabase';
import deleteMenu from './deleteMenu';
import deleteSeries from './deleteSeries';
import deleteVolumes from './deleteVolumes';
import deleteWaves from './deleteWaves';

const functionMap: Record<Resource, (databaseName: string, id: Identifier) => Promise<unknown>> = {
  aliases: deleteAlias,
  db: deleteDatabase,
  menu: deleteMenu,
  series: deleteSeries,
  volumes: deleteVolumes,
  waves: deleteWaves,
};

const onDelete = async (resource: Resource, databaseName?: string, id?: string | number) => {
  const deleteFunction = functionMap[resource];

  await deleteFunction(databaseName as string, id as Identifier);
  revalidatePath('');
};

export default onDelete;
