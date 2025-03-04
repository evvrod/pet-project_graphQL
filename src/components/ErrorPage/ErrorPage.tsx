import { Button, Link } from 'UI components/index';

import styles from './ErrorPage.module.css';

interface IErrorPageProps {
  reset: () => void;
}

export default function ErrorPage(props: IErrorPageProps) {
  const { reset } = props;
  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <Link href="/">Return Home</Link> <span>{' or '}</span>
        <Button onClick={() => reset()}>{'Try again'}</Button>
      </div>
      <div className={styles['background-wrapper']}>
        <h1 className={styles.title}>Error</h1>
      </div>
      <p className={styles.description}>Something went wrong!</p>
    </div>
  );
}
