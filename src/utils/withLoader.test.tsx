import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { withLoader } from 'utils/index';

const TestComponent = () => <div>Test Content</div>;

vi.mock('UI components/index', () => ({
  Loader: () => <div>Loading...</div>,
}));

const WrappedComponent = withLoader(TestComponent);

describe('withLoader HOC', () => {
  test('renders the passed component', () => {
    render(<WrappedComponent isLoading={false} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('displays Loader when isLoading=true', () => {
    render(<WrappedComponent isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('does not display Loader when isLoading=false', () => {
    render(<WrappedComponent isLoading={false} />);
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
