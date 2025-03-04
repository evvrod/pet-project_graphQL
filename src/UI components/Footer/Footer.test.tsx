import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import 'tests/imageMock';

import { Footer } from './Footer';
import styles from './Footer.module.css';

describe('Footer component', () => {
  test('renders Footer component correctly', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/evvrod',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const copyrightText = screen.getByText('© 2025 Graphql Client');
    expect(copyrightText).toBeInTheDocument();

    const rssLogoImage = screen.getByAltText('rss logo');
    expect(rssLogoImage).toBeInTheDocument();
    expect(rssLogoImage).toHaveClass(styles.logo);
  });
});
