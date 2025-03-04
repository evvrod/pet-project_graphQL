import { ReactNode } from 'react';
import Link from 'next/link';

import styles from './MyLink.module.css';

interface ILinkProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

export function MyLink(props: ILinkProps) {
  const { href, className, children, target, rel } = props;
  return (
    <Link
      className={`${styles['my-link']} ${className}`}
      href={href}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
