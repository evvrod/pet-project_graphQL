import { describe, test, expect, vi } from 'vitest';
import fetchGraphql from './fetchGraphql';

import { GraphqlData } from 'types/types';

describe('fetchGraphql', () => {
  test('throws error if query or endpoint is missing', async () => {
    const graphqlData: GraphqlData = {
      query: '',
      endpoint: '',
      variables: {},
      headers: {},
    };

    const response = await fetchGraphql(graphqlData);
    expect(response).toEqual({
      'data': null,
      'error': '[{"message":"Query and endpoint must be provided"}]',
      'statusCode': 400,
    });
  });

  test('should return data on successful fetch', async () => {
    const graphqlData: GraphqlData = {
      query: '{ items { id name } }',
      variables: {},
      endpoint: 'https://example.com/graphql',
      headers: { 'Content-Type': 'application/json' },
    };

    const mockResponse = { data: { items: [{ id: 1, name: 'Item 1' }] } };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response),
    );

    const response = await fetchGraphql(graphqlData);

    expect(response).toEqual({
      data: JSON.stringify(mockResponse),
      statusCode: 200,
      error: null,
    });
  });

  test('returns error if the server returns an error in the response', async () => {
    const graphqlData: GraphqlData = {
      query: '{ user { id name } }',
      endpoint: 'https://example.com/graphql',
      headers: { 'Content-Type': 'application/json' },
      variables: {},
    };

    const mockErrorResponse = {
      errors: [{ message: 'User not found' }],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockErrorResponse),
      } as Response),
    );

    const response = await fetchGraphql(graphqlData);

    expect(response).toEqual({
      error: JSON.stringify(mockErrorResponse.errors),
      statusCode: 400,
      data: null,
    });
  });

  test('handles error from server and executes catch block', async () => {
    const errorMessage = 'Internal Server Error';

    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 500,
        json: () => Promise.resolve({ errors: [{ message: errorMessage }] }),
      } as Response),
    );

    const graphqlData = {
      query: '{ user { id name } }',
      endpoint: 'https://example.com/graphql',
      headers: { 'Content-Type': 'application/json' },
      variables: {},
    };

    const response = await fetchGraphql(graphqlData);

    expect(response).toEqual({
      error: '[{"message":"Internal Server Error"}]',
      statusCode: 500,
      data: null,
    });
  });

  test('handles unexpected error and executes catch block for other errors', async () => {
    const errorMessage = 'Unexpected error';

    global.fetch = vi.fn(() => Promise.reject(new Error(errorMessage)));

    const graphqlData = {
      query: '{ user { id name } }',
      endpoint: 'https://example.com/graphql',
      headers: { 'Content-Type': 'application/json' },
      variables: {},
    };

    const response = await fetchGraphql(graphqlData);

    expect(response).toEqual({
      error: '[{"message":"Unexpected error"}]',
      statusCode: 500,
      data: null,
    });
  });
});
