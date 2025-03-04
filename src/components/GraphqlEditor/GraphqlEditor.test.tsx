import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import GraphqlEditor from './GraphqlEditor';
import fetchGraphql from '@/services/fetchGraphql';

interface IInputProps {
  label: string;
  value: string;
  name?: string;
  onBlur: (value: string) => void;
}

type IButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

vi.mock('UI components/index', () => ({
  Input: ({ value, onBlur, name, label }: IInputProps) => (
    <input
      data-testid={name}
      value={value}
      onChange={vi.fn()}
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => onBlur(e.target.value)}
      placeholder={label}
    />
  ),
  Button: ({ onClick, children }: IButtonProps) => (
    <button data-testid="submit-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock('components/ParameterSection/ParameterSection', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('components/QueryEditor/QueryEditor', () => ({
  __esModule: true,
  default: ({
    value,
    onBlur,
  }: {
    value: string;
    onBlur: (value: string) => void;
  }) => (
    <textarea
      data-testid="query-editor"
      value={value}
      onBlur={(e) => onBlur(e.target.value)}
      onChange={vi.fn()}
    />
  ),
}));

vi.mock('components/KeyValueEditor/KeyValueEditor', () => ({
  __esModule: true,
  default: ({
    values,
    onBlur,
  }: {
    values: Record<string, string>;
    onBlur: (value: Record<string, string>) => void;
  }) => (
    <div>
      {Object.entries(values).map(([key, value]) => (
        <input
          key={key}
          data-testid={`key-value-${key}`}
          value={value}
          onBlur={(e) => onBlur({ [key]: e.target.value })}
          onChange={vi.fn()}
        />
      ))}
    </div>
  ),
}));

vi.mock('services/fetchGraphql', () => ({
  default: vi.fn(),
}));

describe('GraphqlEditor', () => {
  const setApiState = vi.fn();
  const updateURL = vi.fn();

  const defaultGraphqlData = {
    endpoint: 'http://localhost/graphql',
    query: '{ users { id name } }',
    variables: { 'userId': '1' },
    headers: { 'Authorization': 'Bearer token' },
  };

  test('renders the form and interacts with the input fields', () => {
    render(
      <GraphqlEditor
        setApiState={setApiState}
        updateURL={updateURL}
        defaultGraphqlData={defaultGraphqlData}
      />,
    );

    expect(screen.getByTestId('endpoint')).toHaveValue(
      defaultGraphqlData.endpoint,
    );
    expect(screen.getByTestId('query-editor')).toHaveValue(
      defaultGraphqlData.query,
    );

    fireEvent.blur(screen.getByTestId('endpoint'), {
      target: { value: 'http://new-url/graphql' },
    });
    expect(updateURL).toHaveBeenCalledWith(
      'endpoint',
      'http://new-url/graphql',
    );

    fireEvent.blur(screen.getByTestId('query-editor'), {
      target: { value: '{ users { id email } }' },
    });
    expect(updateURL).toHaveBeenCalledWith('query', '{ users { id email } }');
  });

  test('calls handleSubmit on form submission', async () => {
    const mockResponse = {
      statusCode: 200,
      data: '{ users: [] }',
      error: null,
    };

    vi.mocked(fetchGraphql).mockResolvedValue(mockResponse);

    render(
      <GraphqlEditor
        setApiState={setApiState}
        updateURL={updateURL}
        defaultGraphqlData={defaultGraphqlData}
      />,
    );

    fireEvent.click(screen.getByTestId('submit-button'));
    expect(setApiState).toHaveBeenCalledWith({
      isLoading: true,
      response: { statusCode: null, data: null, error: null },
    });

    expect(fetchGraphql).toHaveBeenCalledWith({
      ...defaultGraphqlData,
      headers: {
        ...defaultGraphqlData.headers,
        'Content-Type': 'application/json',
      },
    });

    await waitFor(() => {
      expect(setApiState).toHaveBeenCalledWith({
        isLoading: false,
        response: mockResponse,
      });
    });
  });

  test('displays an error state if the API request fails', async () => {
    vi.mocked(fetchGraphql).mockRejectedValue(
      new Error('Internal server error'),
    );

    render(
      <GraphqlEditor
        setApiState={setApiState}
        updateURL={updateURL}
        defaultGraphqlData={defaultGraphqlData}
      />,
    );

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(setApiState).toHaveBeenCalledWith({
      isLoading: true,
      response: { statusCode: null, data: null, error: null },
    });

    await waitFor(() => {
      expect(setApiState).toHaveBeenCalledWith({
        isLoading: false,
        response: {
          statusCode: 500,
          data: null,
          error: '{"message":"Internal server error"}',
        },
      });
    });
  });
});
