import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonLink } from './ButtonLink';
import styles from './ButtonLink.module.css';

describe('ButtonLink', () => {
  test('renders the text inside the link', () => {
    render(<ButtonLink href="/test" text="Test Link" />);

    const link = screen.getByText('Test Link');
    expect(link).toBeInTheDocument();
  });

  test('points to the correct href', () => {
    render(<ButtonLink href="/test" text="Test Link" />);

    const link = screen.getByText('Test Link') as HTMLAnchorElement;
    expect(link.pathname).toBe('/test');
  });

  test('applies the correct CSS class', () => {
    render(<ButtonLink href="/test" text="Test Link" />);

    const link = screen.getByText('Test Link');
    expect(link).toHaveClass(styles.link);
  });
});
