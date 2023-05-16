'use server';

import { headers as getHeaders } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function onDelete(id: string | number, databaseName: string) {
  const headers = getHeaders();
  const url = headers.get('Next-Url');
  const origin = headers.get('Origin');

  await fetch(`${origin}/api/${databaseName}/${id}`, {
    method: 'DELETE',
  });

  if (url) {
    revalidatePath(url);
  }
}
