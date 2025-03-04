import styles from './Button.module.css';

type IButtonProps = {
  text?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function Button(props: IButtonProps) {
  const { text, type, onClick, disabled, className, children } = props;

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
}
