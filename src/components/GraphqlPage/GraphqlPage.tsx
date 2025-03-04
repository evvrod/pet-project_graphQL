'use client';

import { useState, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import GraphqlEditor from 'components/GraphqlEditor/GraphqlEditor';
import GraphqlResponse from 'components/GraphqlResponse/GraphqlResponse';

import { generateUrlGraphQl, parseUrl, withLoader } from 'utils/index';

import { GraphqlData, ApiState } from 'types/types';

import styles from './GraphqlPage.module.css';

const initialApiState = {
  response: { statusCode: null, data: null, error: null },
  isLoading: false,
};

export default function GraphqlPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const graphqlData = parseUrl(pathname, searchParams);
  const router = useRouter();

  const [apiState, setApiState] = useState<ApiState>(initialApiState);

  const updateURL = useCallback(
    <K extends keyof GraphqlData>(key: K, value: GraphqlData[K]): void => {
      const newGraphqlData = { ...graphqlData, [key]: value };
      const newUrl = generateUrlGraphQl(newGraphqlData);
      router.replace(`/graphql/${newUrl}`, { scroll: false });
    },
    [graphqlData, router],
  );

  const GraphqlResponseWithLoader = withLoader(GraphqlResponse);

  return (
    <>
      <div className={styles.column}>
        <h2 className={styles.title}>{'Editor'}</h2>
        <GraphqlEditor
          setApiState={setApiState}
          updateURL={updateURL}
          defaultGraphqlData={graphqlData}
        />
      </div>

      <div className={styles.column}>
        <h2 className={styles.title}>{'Response'}</h2>
        <GraphqlResponseWithLoader
          isLoading={apiState.isLoading}
          response={apiState.response}
        />
      </div>
    </>
  );
}
