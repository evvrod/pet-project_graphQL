import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { prettyPrint } from 'utils/index';
import QueryEditor from './QueryEditor';

vi.mock('UI components/index', () => ({
  ButtonWithIcon: vi.fn(() => <button>Mocked Button</button>),
  Textarea: vi.fn(({ onBlur, value }) => (
    <textarea
      value={value}
      onBlur={(e) => onBlur(e.target.value)}
      onChange={vi.fn()}
    />
  )),
}));

vi.mock('utils/index', () => ({
  prettyPrint: vi.fn(),
}));

describe('QueryEditor', () => {
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with initial value', () => {
    vi.mocked(prettyPrint).mockResolvedValue({
      text: 'formatted query',
      error: null,
    });
    render(<QueryEditor value="initial query" onBlur={mockOnBlur} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('initial query');
  });

  test('formats the query when it changes', async () => {
    vi.mocked(prettyPrint).mockResolvedValue({
      text: 'formatted query',
      error: null,
    });

    render(<QueryEditor value="initial query" onBlur={mockOnBlur} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.blur(textarea, { target: { value: 'new query' } });

    await waitFor(() =>
      expect(vi.mocked(prettyPrint)).toHaveBeenCalledWith(
        'new query',
        'graphql',
      ),
    );

    expect(mockOnBlur).toHaveBeenCalledWith('formatted query');
  });

  test('displays an error message when there is an error in prettyPrint', async () => {
    vi.mocked(prettyPrint).mockResolvedValue({
      text: '',
      error: 'Formatting error',
    });

    render(<QueryEditor value="query with error" onBlur={mockOnBlur} />);

    await waitFor(() => {
      expect(screen.getByText('Formatting error')).toBeInTheDocument();
    });
  });

  test('does not display error if there is no error', async () => {
    vi.mocked(prettyPrint).mockResolvedValue({
      text: 'formatted query',
      error: null,
    });

    render(<QueryEditor value="valid query" onBlur={mockOnBlur} />);

    await waitFor(() => {
      expect(screen.queryByText('Formatting error')).toBeNull();
    });
  });
});
