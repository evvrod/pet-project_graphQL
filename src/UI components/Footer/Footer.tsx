import Image from 'next/image';
import rssLogo from 'assets/icons/rss-logo.svg';
import { Link } from 'UI components/index';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <Link
        target="_blank"
        href="https://github.com/evvrod"
        rel="noopener noreferrer"
      >
        GitHub
      </Link>
      <span>© 2025 Graphql Client</span>
      <Image src={rssLogo} alt="rss logo" className={styles.logo} />
    </footer>
  );
}
