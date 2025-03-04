'use client';

import { useState, useEffect } from 'react';

import styles from './Textarea.module.css';

interface ITextareaProps {
  value: string;
  readOnly?: boolean;
  className?: string;
  onBlur?: (value: string) => void;
}

export function Textarea(props: ITextareaProps) {
  const { value, className, readOnly, onBlur = () => {} } = props;

  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <textarea
      className={`${styles.textarea} ${className} `}
      onChange={(event) => setText(event.target.value)}
      onBlur={() => onBlur(text)}
      value={text}
      readOnly={readOnly || false}
    />
  );
}
