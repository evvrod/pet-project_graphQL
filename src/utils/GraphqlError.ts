export class GraphqlError extends Error {
  errorData: string;
  statusCode: number;

  constructor(
    message: string | { errors: { message: string }[] },
    statusCode: number,
  ) {
    if (typeof message === 'string') {
      super(message);
      this.errorData = `[{"message":"${message}"}]`;
    } else {
      super(JSON.stringify(message));
      this.errorData = JSON.stringify(message);
    }
    this.name = 'GraphqlError';
    this.statusCode = statusCode;
  }
}