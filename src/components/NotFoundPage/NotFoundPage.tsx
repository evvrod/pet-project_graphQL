import { Link } from 'UI components/index';

import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.content}>
      <Link href="/">Return Home</Link>
      <div className={styles['background-wrapper']}>
        <h1 className={styles.title}>404</h1>
      </div>
      <p className={styles.description}>
        The page you’re looking for does not exist.
      </p>
    </div>
  );
}
