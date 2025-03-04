'use server';

import { GraphqlData, ResponseFetch } from 'types/types';
import { GraphqlError } from 'utils/index';

export default async function fetchGraphql(
  graphqlData: GraphqlData,
): Promise<ResponseFetch> {
  const { query, variables, endpoint, headers } = graphqlData;

  let statusCode = null;

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: new Headers(headers),
    body: JSON.stringify({
      query,
      variables,
    }),
    redirect: 'follow',
  };

  try {
    if (!query || !endpoint) {
      throw new GraphqlError('Query and endpoint must be provided', 400);
    }

    const response = await fetch(endpoint, requestOptions);
    statusCode = response.status;

    const jsonData = await response.json();

    if (statusCode === 200 && jsonData.errors) {
      throw new GraphqlError(jsonData.errors, 400);
    }

    if (statusCode === 500 && jsonData.errors) {
      throw new GraphqlError(jsonData.errors, 500);
    }

    return { data: JSON.stringify(jsonData), statusCode, error: null };
  } catch (error) {
    if (error instanceof GraphqlError) {
      return {
        error: error.errorData,
        statusCode: error.statusCode,
        data: null,
      };
    }
    return {
      error: `[{"message":"Unexpected error"}]`,
      statusCode: statusCode || 500,
      data: null,
    };
  }
}
