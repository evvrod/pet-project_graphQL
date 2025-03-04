import { GraphqlData } from 'types/types';

export function stringToBase64(str: string) {
  return Buffer.from(str, 'utf-8').toString('base64');
}

export function generateUrlGraphQl(params: GraphqlData): string {
  const { endpoint, query, variables, headers } = params;

  const endpointStr = encodeURIComponent(stringToBase64(endpoint));
  const bodyStr = encodeURIComponent(
    stringToBase64(JSON.stringify({ query, variables })),
  );
  const headersStr = Object.entries(headers)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join('&');

  return headersStr
    ? `/${endpointStr}/${bodyStr}/?${headersStr}`
    : `/${endpointStr}/${bodyStr}`;
}
