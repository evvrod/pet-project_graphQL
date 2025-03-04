import { GraphqlData } from 'types/types';

function convertQueryStringToObject(
  searchParams: URLSearchParams,
): Record<string, string> {
  return Object.fromEntries(searchParams.entries());
}

function base64ToString(str: string): string {
  try {
    const decoded = atob(str);
    return new TextDecoder().decode(
      Uint8Array.from(decoded, (c) => c.charCodeAt(0)),
    );
  } catch {
    throw 'Error: Invalid base64 string: ' + str;
  }
}

export function parseUrl(
  url: string,
  searchParams: URLSearchParams,
): GraphqlData {
  try {
    const decodedUrl = decodeURIComponent(url);
    const graphqlIndex = decodedUrl.indexOf('/graphql/');
    const urlAfterGraphql =
      graphqlIndex !== -1 ? decodedUrl.substring(graphqlIndex + 9) : '';

    const [endpointBase64, bodyBase64] = urlAfterGraphql.split('/');

    const endpoint = endpointBase64 ? base64ToString(endpointBase64) : '';

    let query = '';
    let variables: Record<string, string> = {};

    if (bodyBase64) {
      const body = JSON.parse(base64ToString(bodyBase64));
      query = body.query || '';
      variables = body.variables || {};
    }

    const headers = convertQueryStringToObject(searchParams);
    
    return { endpoint, query, variables, headers };
  } catch {
    return { endpoint: '', query: '', variables: {}, headers: {} };
  }
}
