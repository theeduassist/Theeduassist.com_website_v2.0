import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityCdnClient as sanityClient } from './client';

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source) {
  if (!source) {
    return null;
  }
  return builder.image(source).auto('format').fit('max');
}
