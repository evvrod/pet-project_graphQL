import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders button with text prop', () => {
    render(<Button text="Click me" />);

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('renders button with children', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('has correct button type', () => {
    render(<Button type="submit" />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} text="Click me" />);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled={true} text="Click me" />);

    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });

  test('has additional className when passed', () => {
    render(<Button className="extra-class" text="Click me" />);

    const button = screen.getByText('Click me');
    expect(button).toHaveClass('extra-class');
  });

  test('renders default button with no props', () => {
    render(<Button />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
