'use server';

import { headers as getHeaders } from 'next/headers';
import { revalidatePath } from 'next/cache';

import Resource from 'types/Resource';
import { deleteAlias, deleteDatabase, deleteMenu, deleteSeries, deleteVolumes, deleteWaves } from '@api/delete';
import Identifier from 'types/Identifier';

const functionMap: Record<Resource, (databaseName: string, id: Identifier) => Promise<unknown>> = {
  aliases: deleteAlias,
  db: deleteDatabase,
  menu: deleteMenu,
  series: deleteSeries,
  volumes: deleteVolumes,
  waves: deleteWaves,
};

export async function onDelete(resource: Resource, databaseName?: string, id?: string | number) {
  const headers = getHeaders();
  const url = headers.get('Next-Url');

  const deleteFunction = functionMap[resource];

  await deleteFunction(databaseName as string, id as Identifier);

  if (url) {
    revalidatePath(url);
  }
}
