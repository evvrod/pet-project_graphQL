import styles from './TabsNavigation.module.css';

interface ITabsNavigation {
  sections: string[];
  visibleSection: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function TabsNavigation(props: ITabsNavigation) {
  const { sections, visibleSection, onClick } = props;

  return (
    <div className={styles['navigation-list']}>
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          className={`${styles.button} ${visibleSection === section ? styles.active : ''}`}
          onClick={onClick}
          name={section}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </div>
  );
}
