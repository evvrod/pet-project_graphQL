import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import GraphqlResponse from './GraphqlResponse';
import { prettyPrint } from 'utils/index';

vi.mock('UI components/index', () => ({
  Textarea: vi.fn(({ value }) => <textarea value={value} readOnly={true} />),
}));

vi.mock('utils/index', () => ({
  prettyPrint: vi.fn(),
}));

describe('GraphqlResponse', () => {
  test('renders with status code and formatted response', async () => {
    const mockResponse = {
      data: '{"name": "John"}',
      statusCode: 200,
      error: null,
    };

    const mockFormattedResponse = '{"name": "John"}';

    vi.mocked(prettyPrint).mockResolvedValueOnce({
      text: mockFormattedResponse,
      error: null,
    });

    render(<GraphqlResponse response={mockResponse} />);

    expect(screen.getByText('Status code: 200')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockFormattedResponse)).toBeInTheDocument();
    });
  });

  test('displays error message when response cannot be formatted', async () => {
    const mockResponse = {
      data: '"name": "John"',
      statusCode: 400,
      error: null,
    };

    vi.mocked(prettyPrint).mockRejectedValueOnce(
      new Error('Some error occurred'),
    );

    render(<GraphqlResponse response={mockResponse} />);

    expect(screen.getByText('Status code: 400')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/⚠️ Cannot format response: Some error occurred/i),
      ).toBeInTheDocument();
    });
  });

  test('renders with empty response when no data or error', async () => {
    const mockResponse = {
      data: null,
      statusCode: null,
      error: null,
    };

    vi.mocked(prettyPrint).mockResolvedValueOnce({ text: '', error: null });

    render(<GraphqlResponse response={mockResponse} />);

    expect(screen.getByText('Status code:')).toBeInTheDocument();

    await waitFor(() => {
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveValue('');
    });
  });
});
