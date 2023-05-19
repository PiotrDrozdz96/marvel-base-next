'use server';

import { headers as getHeaders } from 'next/headers';
import { revalidatePath } from 'next/cache';

import reorderVolumesByDate from '@api/reorderVolumesByDate';

export async function sortByDate() {
  const headers = getHeaders();
  const url = headers.get('Next-Url');
  const parts = url?.split('/') || [];
  const databaseName = parts[2];

  await reorderVolumesByDate(databaseName, 'global_order');
  revalidatePath('');
}
