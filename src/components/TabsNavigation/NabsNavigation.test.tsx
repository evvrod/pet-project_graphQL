import { vi, describe, test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import TabsNavigation from './TabsNavigation';
import styles from './TabsNavigation.module.css';

describe('TabsNavigation', () => {
  const mockOnClick = vi.fn();
  const sections = ['home', 'about', 'contact'];

  test('renders all sections as buttons', () => {
    const { getByText } = render(
      <TabsNavigation
        sections={sections}
        visibleSection="home"
        onClick={mockOnClick}
      />,
    );

    sections.forEach((section) => {
      expect(
        getByText(section.charAt(0).toUpperCase() + section.slice(1)),
      ).toBeInTheDocument();
    });
  });

  test('applies active class to the visible section', () => {
    const { getByText } = render(
      <TabsNavigation
        sections={sections}
        visibleSection="about"
        onClick={mockOnClick}
      />,
    );

    const activeButton = getByText('About');
    expect(activeButton).toHaveClass(styles.active);

    sections
      .filter((section) => section !== 'about')
      .forEach((section) => {
        const button = getByText(
          section.charAt(0).toUpperCase() + section.slice(1),
        );
        expect(button).not.toHaveClass(styles.active);
      });
  });

  test('calls onClick when a button is clicked', () => {
    const { getByText } = render(
      <TabsNavigation
        sections={sections}
        visibleSection="home"
        onClick={mockOnClick}
      />,
    );

    const button = getByText('About');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.objectContaining({ target: button }),
    );
  });
});
