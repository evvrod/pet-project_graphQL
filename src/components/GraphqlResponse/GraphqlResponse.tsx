'use client';

import { useState, useEffect, useCallback } from 'react';

import { Textarea } from 'UI components/index';

import { prettyPrint } from 'utils/index';
import { ResponseFetch } from 'types/types';

import styles from './GraphqlResponse.module.css';

interface IGraphqlResponseProps {
  response: ResponseFetch;
}

export default function GraphqlResponse(props: IGraphqlResponseProps) {
  const { data, statusCode, error } = props.response;

  const [formattedResponse, setFormattedResponse] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(!!error);

  const formatResponse = useCallback(async () => {
    const content = error || data || '';
    try {
      const result = await prettyPrint(content, 'json');
      if (result.error) throw Error(result.error);
      setFormattedResponse(result.text);
    } catch (error) {
      setFormattedResponse(
        `${content}\n\n⚠️ Cannot format response: ${error instanceof Error ? error.message : ''}`,
      );
      setHasError(true);
    }
  }, [data, error]);

  useEffect(() => {
    formatResponse();
  }, [formatResponse]);

  return (
    <div className={styles.response}>
      <p>{`Status code: ${statusCode || ''}`} </p>
      <div
        className={`${styles.wrapperTextarea} ${hasError ? styles.error : ''}`}
      >
        <Textarea
          value={formattedResponse}
          readOnly={true}
          className={styles.textarea}
        />
      </div>
    </div>
  );
}
