import { vi, describe, test, expect } from 'vitest';

import { render, screen } from '@testing-library/react';
import { MyLink } from './MyLink';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
    rel?: string;
  }) => <a {...props}>{children}</a>,
}));

describe('MyLink component', () => {
  test('renders link with correct href and children', () => {
    const href = '/test';
    const children = 'Click here';

    render(<MyLink href={href}>{children}</MyLink>);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', href);
    expect(linkElement).toHaveTextContent(children);
  });

  test('renders link with target and rel attributes', () => {
    const href = '/test';
    const target = '_blank';
    const rel = 'noopener noreferrer';
    const children = 'Open in new tab';

    render(
      <MyLink href={href} target={target} rel={rel}>
        {children}
      </MyLink>,
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', href);
    expect(linkElement).toHaveAttribute('target', target);
    expect(linkElement).toHaveAttribute('rel', rel);
  });

  test('renders link without target and rel attributes when not provided', () => {
    const href = '/test';
    const children = 'No target';

    render(<MyLink href={href}>{children}</MyLink>);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', href);
    expect(linkElement).not.toHaveAttribute('target');
    expect(linkElement).not.toHaveAttribute('rel');
  });
});
