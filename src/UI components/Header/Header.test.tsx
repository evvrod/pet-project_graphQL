import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import 'tests/imageMock';

describe('Header', () => {
  test('renders logo image with correct properties', () => {
    render(<Header />);

    const logoImage = screen.getByAltText('logo') as HTMLImageElement;
    expect(logoImage).toBeInTheDocument();

    expect(logoImage).toHaveAttribute('alt', 'logo');
  });
});
