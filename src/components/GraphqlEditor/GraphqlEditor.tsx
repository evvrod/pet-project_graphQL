'use client';

import { useReducer, useCallback } from 'react';

import { Input, Button } from 'UI components/index';
import ParameterSection from 'components/ParameterSection/ParameterSection';
import QueryEditor from 'components/QueryEditor/QueryEditor';
import KeyValueEditor from 'components/KeyValueEditor/KeyValueEditor';

import fetchGraphql from '@/services/fetchGraphql';
import { GraphqlData, ApiState } from 'types/types';

import styles from './GraphqlEditor.module.css';

type Action<K extends keyof GraphqlData> = {
  type: `SET_${Uppercase<K & string>}`;
  payload: GraphqlData[K];
};

const actionTypes: {
  [key in keyof GraphqlData]: `SET_${Uppercase<key & string>}`;
} = {
  endpoint: 'SET_ENDPOINT',
  query: 'SET_QUERY',
  variables: 'SET_VARIABLES',
  headers: 'SET_HEADERS',
};

const GRAPHQL_HEADER_DEFAULT: Record<string, string> = {
  'Content-Type': 'application/json',
};

const graphqlDataReducer = (
  state: GraphqlData,
  action: Action<keyof GraphqlData>,
): GraphqlData => {
  switch (action.type) {
    case 'SET_ENDPOINT':
      return { ...state, endpoint: action.payload as string };
    case 'SET_QUERY':
      return { ...state, query: action.payload as string };
    case 'SET_VARIABLES':
      return { ...state, variables: action.payload as Record<string, string> };
    case 'SET_HEADERS':
      return { ...state, headers: action.payload as Record<string, string> };
    default:
      return state;
  }
};

interface IFormGraphQlProps {
  setApiState: React.Dispatch<React.SetStateAction<ApiState>>;
  updateURL: <K extends keyof GraphqlData>(
    key: K,
    value: GraphqlData[K],
  ) => void;
  defaultGraphqlData: GraphqlData;
}

export default function GraphqlEditor(props: IFormGraphQlProps) {
  const { setApiState, updateURL, defaultGraphqlData } = props;

  const [graphqlData, dispatch] = useReducer(
    graphqlDataReducer,
    defaultGraphqlData,
  );

  async function handleSubmit(graphqlData: GraphqlData) {
    setApiState({
      isLoading: true,
      response: { statusCode: null, data: null, error: null },
    });
    let response;
    try {
      response = await fetchGraphql({
        ...graphqlData,
        headers: { ...graphqlData.headers, ...GRAPHQL_HEADER_DEFAULT },
      });
      setApiState({ isLoading: false, response });
    } catch {
      setApiState({
        isLoading: false,
        response: {
          statusCode: 500,
          data: null,
          error: `{"message":"Internal server error"}`,
        },
      });
    }
  }

  const handleBlur = useCallback(
    <K extends keyof GraphqlData>(key: K, value: GraphqlData[K]): void => {
      const currentValue = graphqlData[key];

      if (JSON.stringify(currentValue) !== JSON.stringify(value)) {
        updateURL(key, value);
        dispatch({ type: actionTypes[key], payload: value });

        setApiState((prevState) => ({
          ...prevState,
          response: { statusCode: null, data: null, error: null },
        }));
      }
    },
    [graphqlData, updateURL, setApiState],
  );

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(graphqlData);
      }}
      autoComplete="off"
    >
      <div className={styles['wrapper-inputs']}>
        <div className={styles['wrapper-url']}>
          <Input
            name="endpoint"
            label="URL:"
            value={graphqlData.endpoint}
            onBlur={(newValue) => handleBlur('endpoint', newValue)}
          ></Input>
          <Button type="submit" className={styles['btn-send']}>
            {'Send'}
          </Button>
        </div>
        <ParameterSection>
          <QueryEditor
            data-section="query"
            value={graphqlData.query}
            onBlur={(newValue) => handleBlur('query', newValue)}
          />
          <KeyValueEditor
            data-section="headers"
            values={graphqlData.headers}
            requiredValues={GRAPHQL_HEADER_DEFAULT}
            onBlur={(newValue) => handleBlur('headers', newValue)}
          />
          <KeyValueEditor
            data-section="variables"
            values={graphqlData.variables}
            onBlur={(newValue) => handleBlur('variables', newValue)}
          />
        </ParameterSection>
      </div>
    </form>
  );
}
