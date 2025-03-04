'use client';

import React, { useState } from 'react';

import TabsNavigation from 'components/TabsNavigation/TabsNavigation';

import styles from './ParameterSection.module.css';

interface IParameterSectionProps {
  children: React.ReactElement<{ 'data-section': string }>[];
}

export default function ParameterSection(props: IParameterSectionProps) {
  const { children } = props;

  const sections = children.map((child, index) =>
    React.isValidElement(child) && child.props['data-section']
      ? child.props['data-section']
      : `no-name-${index + 1}`,
  );

  const [visibleSection, setVisibleSection] = useState<string>(
    sections[0] || '',
  );

  function handlerClickNavigation(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.target instanceof HTMLButtonElement) {
      const section = event.target.name;
      if (sections.includes(section)) {
        setVisibleSection(section);
      }
    }
  }

  return (
    <>
      <TabsNavigation
        sections={sections}
        visibleSection={visibleSection}
        onClick={handlerClickNavigation}
      />
      <div className={styles['param-section']}>
        {children.map((child) =>
          React.isValidElement(child) &&
          child.props['data-section'] === visibleSection
            ? child
            : null,
        )}
      </div>
    </>
  );
}
