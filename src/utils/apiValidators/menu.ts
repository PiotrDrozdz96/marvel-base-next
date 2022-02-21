import { NextApiResponse } from 'next';
import { ApiMenuItem } from 'types/Menu';
import { interpolate } from 'utils/interpolate';
import pick from 'utils/pick';

import messages from './apiValidators.messages';

const menuField: (keyof ApiMenuItem)[] = ['name', 'type', 'order', 'url', 'icon', 'parent_id'];
const menuRequiredField: (keyof ApiMenuItem)[] = ['name', 'type', 'order'];
const typeValidValues = ['SUB_MENU', 'MAIN_MENU'];
const iconValidValues = ['home', 'tv', 'reader'];

const menuValidation = (res: NextApiResponse, initialBody: Partial<ApiMenuItem>): ApiMenuItem | undefined => {
  const body = pick(initialBody, menuField);

  const emptyField = menuRequiredField.find((key) => !body[key] && body[key] !== 0);

  if (emptyField) {
    res.status(400).send({ message: interpolate(messages.required, { field: emptyField }) });
  } else if (!typeValidValues.includes(body.type as string)) {
    res.status(400).send({ message: interpolate(messages.includes, { field: 'type', options: typeValidValues }) });
  } else if (body.type === 'MAIN_MENU' && !body.icon) {
    res.status(400).send({ message: interpolate(messages.required, { field: 'icon' }) });
  } else if (body.type === 'MAIN_MENU' && !iconValidValues.includes(body.icon as string)) {
    res.status(400).send({ message: interpolate(messages.includes, { field: 'icon', options: iconValidValues }) });
  } else if (body.type === 'SUB_MENU' && !body.parent_id) {
    res.status(400).send({ message: interpolate(messages.required, { field: 'parent_id' }) });
  } else {
    return {
      ...body,
      order: Number(body.order),
      parent_id: body.parent_id ? Number(body.parent_id) : null,
    } as ApiMenuItem;
  }
  return undefined;
};

export default menuValidation;
