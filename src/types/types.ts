export type GraphqlData = {
  endpoint: string;
  query: string;
  variables: Record<string, string>;
  headers: Record<string, string>;
};

export type ResponseFetch = {
  statusCode: number | null;
  data: string | null;
  error: string | null;
};

export type ApiState = {
  response: ResponseFetch;
  isLoading: boolean;
};
