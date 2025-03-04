'use client';

import { useState, useEffect } from 'react';

import { ButtonWithIcon, Textarea } from 'UI components/index';

import pretty from 'assets/icons/pretty.svg';
import { prettyPrint } from 'utils/index';

import styles from './QueryEditor.module.css';

interface IQueryEditorProps {
  value: string;
  onBlur: (newValue: string) => void;
}

export default function QueryEditor(props: IQueryEditorProps) {
  const { value, onBlur } = props;

  const [error, setError] = useState<string | null>(null);

  const [formattedQuery, setFormattedQuery] = useState<string>(value);

  useEffect(() => {
    const formatQuery = async () => {
      if (value) {
        const formattedText = await prettyPrint(value, 'graphql');
        setFormattedQuery(formattedText.text);
        setError(formattedText.error);
      }
    };

    formatQuery();
  }, [value]);

  async function getPrettyText(txt: string) {
    const formattedText = await prettyPrint(txt, 'graphql');
    setError(formattedText.error);
    onBlur(formattedText.text);
  }

  return (
    <div className={styles['query-editor']}>
      <div className={styles['button-wrapper']}>
        <ButtonWithIcon icon={pretty} alt={'prettify'} onClick={() => {}} />
      </div>
      <Textarea
        className={`${styles.textarea}`}
        onBlur={(newValue) => getPrettyText(newValue)}
        value={formattedQuery}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
