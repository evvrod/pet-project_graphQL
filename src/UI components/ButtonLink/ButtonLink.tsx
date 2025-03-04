import Link from 'next/link';

import styles from './ButtonLink.module.css';

type Props = {
  href: string;
  text: string;
};

export function ButtonLink(props: Props) {
  return (
    <Link href={props.href} className={styles.link}>
      {props.text}
    </Link>
  );
}
