import { describe, test, expect } from 'vitest';

import { generateUrlGraphQl } from 'utils/index';

import { GraphqlData } from 'types/types';

describe('generateUrlGraphQl', () => {
  test('should generate URL with endpoint, query, and variables', () => {
    const params: GraphqlData = {
      endpoint: 'graphql',
      query: 'query { user { id name } }',
      variables: { 'userId': '1' },
      headers: { Authorization: 'Bearer token' },
    };

    const result = generateUrlGraphQl(params);

    expect(result).toBe(
      '/Z3JhcGhxbA%3D%3D/eyJxdWVyeSI6InF1ZXJ5IHsgdXNlciB7IGlkIG5hbWUgfSB9IiwidmFyaWFibGVzIjp7InVzZXJJZCI6IjEifX0%3D/?Authorization=Bearer%20token',
    );
  });

  test('should handle empty query and variables', () => {
    const params: GraphqlData = {
      endpoint: 'graphql',
      query: '',
      variables: {},
      headers: { Authorization: 'Bearer token' },
    };

    const result = generateUrlGraphQl(params);

    expect(result).toBe(
      '/Z3JhcGhxbA%3D%3D/eyJxdWVyeSI6IiIsInZhcmlhYmxlcyI6e319/?Authorization=Bearer%20token',
    );
  });

  test('should generate URL without headers', () => {
    const params: GraphqlData = {
      endpoint: 'graphql',
      query: 'query { user { id name } }',
      variables: { userId: '1' },
      headers: {},
    };

    const result = generateUrlGraphQl(params);

    expect(result).toBe(
      '/Z3JhcGhxbA%3D%3D/eyJxdWVyeSI6InF1ZXJ5IHsgdXNlciB7IGlkIG5hbWUgfSB9IiwidmFyaWFibGVzIjp7InVzZXJJZCI6IjEifX0%3D',
    );
  });

  test('should encode headers correctly', () => {
    const params: GraphqlData = {
      endpoint: 'graphql',
      query: 'query { user { id name } }',
      variables: { userId: '1' },
      headers: { 'X-Custom-Header': 'value', 'Authorization': 'Bearer token' },
    };

    const result = generateUrlGraphQl(params);

    expect(result).toContain('X-Custom-Header=value');
    expect(result).toContain('Authorization=Bearer%20token');
  });
});
