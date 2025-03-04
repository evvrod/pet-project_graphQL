import Image from 'next/image';

import logo from 'assets/logo.svg';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.wrapper}>
      <Image width="100" height="50" src={logo} alt="logo" />
    </header>
  );
}
