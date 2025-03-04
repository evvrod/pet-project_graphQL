import { vi, describe, test, expect } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  test('renders input with label and value', () => {
    const label = 'Name';
    const value = 'John Doe';
    const onBlur = vi.fn();

    render(<Input label={label} value={value} onBlur={onBlur} />);

    const labelElement = screen.getByLabelText(label);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(value);
  });

  test('calls onBlur when input loses focus', () => {
    const label = 'Name';
    const value = 'John Doe';
    const onBlur = vi.fn();

    render(<Input label={label} value={value} onBlur={onBlur} />);

    const inputElement = screen.getByRole('textbox');

    fireEvent.blur(inputElement);

    expect(onBlur).toHaveBeenCalledWith(value);
  });

  test('updates value when input changes', () => {
    const label = 'Name';
    const value = 'John Doe';
    const onBlur = vi.fn();

    render(<Input label={label} value={value} onBlur={onBlur} />);

    const inputElement = screen.getByRole('textbox');
    const newValue = 'Jane Doe';

    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(inputElement).toHaveValue(newValue);
  });

  test('updates value when prop value changes', () => {
    const label = 'Name';
    const value = 'John Doe';
    const onBlur = vi.fn();

    const { rerender } = render(
      <Input label={label} value={value} onBlur={onBlur} />,
    );

    const newValue = 'Jane Doe';
    rerender(<Input label={label} value={newValue} onBlur={onBlur} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(newValue);
  });

  test('calls onBlur with updated value when text is changed and blurred', () => {
    const initialValue = 'Initial text';
    const onBlur = vi.fn();

    render(<Input value={initialValue} onBlur={onBlur} label="Test Label" />);

    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Updated text' } });

    expect(inputElement).toHaveValue('Updated text');

    fireEvent.blur(inputElement);

    expect(onBlur).toHaveBeenCalledWith('Updated text');
  });
});
