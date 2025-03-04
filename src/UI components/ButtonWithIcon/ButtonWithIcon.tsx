import Image from 'next/image';

import styles from './ButtonWithIcon.module.css';

interface IButtonWithIcon {
  onClick?: () => void;
  disabled?: boolean;
  icon: string;
  alt: string;
}

export function ButtonWithIcon(props: IButtonWithIcon) {
  const { icon, disabled, alt, onClick } = props;

  return (
    <button
      className={styles.button}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <Image width="25" height="25" src={icon} alt={alt} />
    </button>
  );
}
