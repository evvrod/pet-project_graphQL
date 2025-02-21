import GraphqlPage from 'components/GraphqlPage/GraphqlPage';

import styles from './layout.module.css';

export default function Layout() {
  return (
    <div className={styles.graphqlPage}>
      <h1 className={styles.title}>{'Graphql Client'}</h1>
      <div className={styles.content}>
        <GraphqlPage />
      </div>
    </div>
  );
}
