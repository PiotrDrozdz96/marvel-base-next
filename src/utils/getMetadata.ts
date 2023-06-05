import { Metadata } from 'next';

const getMetadata = (title = ''): Metadata => ({
  title: `Marvel Base ${title}`,
  description: `Marvel Base ${title}`,
});

export default getMetadata;
