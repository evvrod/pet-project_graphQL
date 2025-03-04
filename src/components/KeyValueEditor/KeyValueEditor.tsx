'use client';

import { useState } from 'react';

import { ButtonWithIcon } from 'UI components/index';

import trash from 'assets/icons/trash.svg';

import styles from './KeyValueEditor.module.css';

interface IKeyValuesProps {
  values: Record<string, string> | undefined;
  requiredValues?: Record<string, string>;
  onBlur: (values: Record<string, string>) => void;
}

function ensureEmptyPair(pairs: { key: string; value: string }[]) {
  if (!pairs.some(({ key, value }) => !key && !value)) {
    pairs.push({ key: '', value: '' });
  }
  return pairs;
}

function generateRecords(pairs: { key: string; value: string }[]) {
  return pairs.reduce(
    (acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export default function KeyValueEditor(props: IKeyValuesProps) {
  const { values, requiredValues = {}, onBlur } = props;
  const [pairs, setPairs] = useState<{ key: string; value: string }[]>(() => [
    ...Object.entries(values ?? {}).map(([key, value]) => ({
      key,
      value,
    })),
    { key: '', value: '' },
  ]);

  function updateField(index: number, key: string, value: string) {
    const updatedPairs = [...pairs];
    updatedPairs[index] = { key, value };
    setPairs(updatedPairs);
  }

  function handleBlur() {
    const seen = new Set<string>();
    const filtered = pairs.filter(({ key, value }) => {
      if (
        !(key || value) ||
        Object.hasOwn(requiredValues, key) ||
        seen.has(key)
      ) {
        return false;
      }
      seen.add(key);
      return true;
    });

    onBlur(generateRecords(filtered));
    setPairs(ensureEmptyPair(filtered));
  }

  function onDeleteClick(index: number) {
    const updatedPairs = pairs
      .filter((_, i) => i !== index)
      .filter(({ key, value }) => key || value);

    onBlur(generateRecords(updatedPairs));
    setPairs(ensureEmptyPair(updatedPairs));
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.cell}>Key</div>
        <div className={styles.cell}>Value</div>
      </div>
      {Object.entries(requiredValues).map(([key, value]) => (
        <div key={key} className={styles.row}>
          <div className={styles.cell}>{key}</div>
          <div className={styles.cell}>{value}</div>
        </div>
      ))}
      {pairs.map(({ key, value }, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.cell}>
            <input
              className={styles.input}
              type="text"
              placeholder="Key"
              value={key}
              onChange={(e) => updateField(index, e.target.value, value)}
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.cell}>
            <input
              className={styles.input}
              type="text"
              placeholder="Value"
              value={value}
              onChange={(e) => updateField(index, key, e.target.value)}
              onBlur={handleBlur}
            />
            <ButtonWithIcon
              onClick={() => onDeleteClick(index)}
              icon={trash}
              alt="Delete"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
