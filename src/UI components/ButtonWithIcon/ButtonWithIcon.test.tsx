import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import 'tests/imageMock';

import { ButtonWithIcon } from './ButtonWithIcon';

describe('ButtonWithIcon component', () => {
  test('renders button with icon', () => {
    const iconSrc = '/path/to/icon.png';
    const altText = 'icon description';

    render(<ButtonWithIcon icon={iconSrc} alt={altText} />);

    const image = screen.getByAltText(altText);
    expect(image).toHaveAttribute('src', iconSrc);
    expect(image).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(
      <ButtonWithIcon
        icon="/path/to/icon.png"
        alt="icon description"
        onClick={onClick}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(
      <ButtonWithIcon
        icon="/path/to/icon.png"
        alt="icon description"
        disabled={true}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('is not disabled when disabled prop is false', () => {
    render(
      <ButtonWithIcon
        icon="/path/to/icon.png"
        alt="icon description"
        disabled={false}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  test('renders default button with no optional props', () => {
    render(<ButtonWithIcon icon="/path/to/icon.png" alt="icon description" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
