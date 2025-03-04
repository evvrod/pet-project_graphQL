'use client';

import { useEffect, useState } from 'react';

import styles from './Input.module.css';

interface IInputProps {
  label: string;
  value: string;
  name?: string;
  onBlur: (value: string) => void;
}

export function Input(props: IInputProps) {
  const { label, value, name, onBlur } = props;
  const [text, setText] = useState(value);

  const inputId = `simpleInput-${label}`;

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        onBlur={() => onBlur(text)}
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        className={styles.input}
      />
    </div>
  );
}
