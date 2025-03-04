import { Suspense } from 'react';
import { Footer, Header, Loader } from 'UI components/index';

import styles from './layout.module.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Suspense
          fallback={
            <div className={styles.wrapperLoader}>
              <Loader />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
