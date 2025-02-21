type PrettyPrintResult = {
  text: string;
  error: string | null;
};

export async function prettyPrint(
  text: string,
  type: 'json' | 'graphql',
): Promise<PrettyPrintResult> {
  if (!text) {
    return { text: '', error: null };
  }

  switch (type) {
    case 'json':
      return prettyPrintJson(text);
    case 'graphql':
      return await prettyPrintGraphql(text);
    default:
      return { text, error: `Unknown type: ${type}` };
  }
}

function prettyPrintJson(text: string): PrettyPrintResult {
  const NUMBER_OF_SPACE = 4;
  try {
    const obj = JSON.parse(text);
    const formattedStr = JSON.stringify(obj, undefined, NUMBER_OF_SPACE);
    return { text: formattedStr, error: null };
  } catch {
    return { text, error: 'Cannot format as JSON' };
  }
}

async function prettyPrintGraphql(text: string): Promise<PrettyPrintResult> {
  const prettier = await import('prettier/standalone');
  const prettierPluginGraphql = await import('prettier/plugins/graphql');

  try {
    const formattedStr = await prettier.format(text, {
      parser: 'graphql',
      plugins: [prettierPluginGraphql],
    });
    return { text: formattedStr, error: null };
  } catch (error) {
    return {
      text,
      error:
        error instanceof Error ? error.message : 'Cannot format as graphql',
    };
  }
}
