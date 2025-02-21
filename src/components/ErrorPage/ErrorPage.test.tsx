import { vi, describe, test, expect } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import ErrorPage from './ErrorPage';

type IButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

interface ILinkProps {
  href: string;
  target?: string;
  rel?: string;
  children: ReactNode;
}

vi.mock('UI components/index', () => ({
  Button: ({ onClick, children }: IButtonProps) => (
    <button onClick={onClick}>{children}</button>
  ),
  Link: ({ href, children }: ILinkProps) => <a href={href}>{children}</a>,
}));

describe('ErrorPage', () => {
  test('renders correctly and calls reset function on button click', () => {
    const resetMock = vi.fn();

    render(<ErrorPage reset={resetMock} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Return Home')).toBeInTheDocument();
    expect(screen.getByText('or')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Try again'));
    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
