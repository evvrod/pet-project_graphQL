import { vi } from 'vitest';

import type { ImageProps } from 'next/image';
import type { FC } from 'react';

vi.mock('next/image', () => ({
  default: (({ alt, src, ...props }: ImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt || ''} src={typeof src === 'string' ? src : ''} {...props} />
  )) as FC<ImageProps>,
}));
