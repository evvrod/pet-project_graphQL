import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ReactNode } from 'react';
import { NotFoundPage } from './NotFoundPage';

interface ILinkProps {
  href: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

vi.mock('UI components/index', () => ({
  Link: ({ href, children }: ILinkProps) => <a href={href}>{children}</a>,
}));

describe('NotFoundPage', () => {
  test('renders correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText('The page you’re looking for does not exist.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Return Home')).toBeInTheDocument();
  });
});
