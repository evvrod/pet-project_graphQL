import { describe, test, expect } from 'vitest';

import { parseUrl } from 'utils/index';
import { GraphqlData } from 'types/types';

describe('parseUrl', () => {
  test('should correctly parse URL and extract parameters', () => {
    const mockSearchParams = new URLSearchParams([
      ['Authorization', 'Bearer token'],
    ]);

    const url =
      '/graphql/Z3JhcGhxbA%3D%3D/eyJxdWVyeSI6InF1ZXJ5IHsgdXNlciB7IGlkIG5hbWUgfSB9IiwidmFyaWFibGVzIjp7InVzZXJJZCI6IjEifX0%3D';

    const expected: GraphqlData = {
      endpoint: 'graphql',
      query: 'query { user { id name } }',
      variables: { 'userId': '1' },
      headers: { Authorization: 'Bearer token' },
    };

    const result = parseUrl(url, mockSearchParams);

    expect(result).toEqual(expected);
  });

  test('should return empty object on invalid URL', () => {
    const mockSearchParams = new URLSearchParams();
    const url = '/invalid-url';

    const result = parseUrl(url, mockSearchParams);

    expect(result).toEqual({
      endpoint: '',
      query: '',
      variables: {},
      headers: {},
    });
  });

  test('throws an error on invalid Base64 string (atob fails)', () => {
    const mockSearchParams = new URLSearchParams();
    const url = '/graphql/invalid_base64/query';

    const result = parseUrl(url, mockSearchParams);

    expect(result).toEqual({
      endpoint: '',
      query: '',
      variables: {},
      headers: {},
    });
  });

  test('returns empty object on invalid Base64 string (TextDecoder fails)', () => {
    const mockSearchParams = new URLSearchParams();
    const brokenBase64 = btoa('invalid\x80string');

    const url = `/graphql/Z3JhcGhxbA%3D%3D/${encodeURIComponent(brokenBase64)}`;

    const result = parseUrl(url, mockSearchParams);
    expect(result).toEqual({
      endpoint: '',
      query: '',
      variables: {},
      headers: {},
    });
  });

  test('returns empty object if base64 body does not contain query or variables', () => {
    const mockSearchParams = new URLSearchParams();
    const url = '/graphql/Z3JhcGhxbA%3D%3D/eyJ1c2VyIjp7fX0%3D';

    const result = parseUrl(url, mockSearchParams);

    expect(result).toEqual({
      endpoint: 'graphql',
      query: '',
      variables: {},
      headers: {},
    });
  });
});
