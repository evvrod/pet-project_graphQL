import { vi, describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';

import { Loader } from './Loader';

vi.mock('./Loader.module.css', () => ({
  default: {
    wrapper: 'mock-wrapper',
    loader: 'mock-loader',
  },
}));

describe('Loader', () => {
  test('renders Loader component with correct classes', () => {
    const { container } = render(<Loader />);

    const wrapperElement = container.querySelector('.mock-wrapper');
    expect(wrapperElement).toBeInTheDocument();

    const loaderElement = wrapperElement?.querySelector('.mock-loader');
    expect(loaderElement).toBeInTheDocument();
  });

  test('renders a loader element inside wrapper', () => {
    const { container } = render(<Loader />);

    const wrapperElement = container.querySelector('.mock-wrapper');
    const loaderElement = wrapperElement?.querySelector('.mock-loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
