import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import GraphqlPage from './GraphqlPage';
import { GraphqlData } from 'types/types';

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: vi.fn(),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('utils/index', () => ({
  generateUrlGraphQl: (GraphqlData: GraphqlData) => {
    const body = JSON.stringify({
      query: GraphqlData.query,
      variables: GraphqlData.variables,
    });
    return `${GraphqlData.endpoint}/${body}`;
  },
  withLoader: vi.fn((Component) => Component),
  parseUrl: vi.fn(() => ({
    endpoint: 'endpoint',
    query: 'query',
    variables: {},
    headers: {},
  })),
}));

vi.mock('components/GraphqlEditor/GraphqlEditor', () => ({
  default: ({
    updateURL,
  }: {
    updateURL: <K extends keyof GraphqlData>(
      key: K,
      value: GraphqlData[K],
    ) => void;
  }) => (
    <div data-testid="graphql-editor">
      <button
        data-testid="update-url"
        onClick={() => updateURL('query', '{ test }')}
      />
    </div>
  ),
}));

vi.mock('components/GraphqlResponse/GraphqlResponse', () => ({
  default: () => <div data-testid="graphql-response" />,
}));

describe('GraphqlPage', () => {
  test('renders GraphqlEditor and GraphqlResponse components', () => {
    render(<GraphqlPage />);

    expect(screen.getByTestId('graphql-editor')).toBeInTheDocument();
    expect(screen.getByTestId('graphql-response')).toBeInTheDocument();
  });

  test('updates URL when updateURL is called', async () => {
    render(<GraphqlPage />);

    screen.getByTestId('update-url').click();

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        '/graphql/endpoint/{"query":"{ test }","variables":{}}',
        {
          scroll: false,
        },
      );
    });
  });

  test('updates state when setApiState is called', async () => {
    render(<GraphqlPage />);

    screen.getByTestId('update-url').click();

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalled();
    });
  });
});
