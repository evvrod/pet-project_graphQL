import { describe, test, expect } from 'vitest';
import { prettyPrint } from './prettyPrint';

describe('prettyPrint', () => {
  test('returns empty text when input is empty', async () => {
    const result = await prettyPrint('', 'json');
    expect(result).toEqual({ text: '', error: null });
  });

  test('formats valid JSON correctly', async () => {
    const json = '{"key": "value"}';
    const result = await prettyPrint(json, 'json');
    expect(result).toEqual({
      text: '{\n    "key": "value"\n}',
      error: null,
    });
  });

  test('returns an error for invalid JSON', async () => {
    const json = 'invalid json';
    const result = await prettyPrint(json, 'json');
    expect(result).toEqual({ text: json, error: 'Cannot format as JSON' });
  });

  test('formats valid GraphQL correctly', async () => {
    const graphqlQuery = '{ user { id name } }';
    const result = await prettyPrint(graphqlQuery, 'graphql');
    const expectedGraphqlQuery = `{
  user {
    id
    name
  }
}
`;
    expect(result).toEqual({ text: expectedGraphqlQuery, error: null });
  });

  test('returns an error for invalid GraphQL', async () => {
    const result = await prettyPrint('error query', 'graphql');
    expect(result.error).toContain('Syntax Error:');
  });

  test('returns an error for unknown type', async () => {
    const result = await prettyPrint('test', 'xml' as 'json' | 'graphql');
    expect(result).toEqual({ text: 'test', error: 'Unknown type: xml' });
  });
});
