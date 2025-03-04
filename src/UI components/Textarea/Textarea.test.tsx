import { describe, test, expect } from 'vitest';

import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';
import { vi } from 'vitest';

describe('Textarea component', () => {
  test('renders textarea with initial value', () => {
    const value = 'Initial text';

    render(<Textarea value={value} />);

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveValue(value);
  });

  test('changes text when user types', () => {
    const value = 'Initial text';

    render(<Textarea value={value} />);

    const textareaElement = screen.getByRole('textbox');
    fireEvent.change(textareaElement, { target: { value: 'Updated text' } });

    expect(textareaElement).toHaveValue('Updated text');
  });

  test('calls onBlur with correct value when blurred', () => {
    const value = 'Initial text';
    const onBlur = vi.fn();

    render(<Textarea value={value} onBlur={onBlur} />);

    const textareaElement = screen.getByRole('textbox');
    fireEvent.blur(textareaElement);

    expect(onBlur).toHaveBeenCalledWith(value);
  });

  test('renders textarea as readOnly when readOnly is true', () => {
    const value = 'Initial text';

    render(<Textarea value={value} readOnly />);

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveAttribute('readOnly');
  });

  test('applies custom className when provided', () => {
    const value = 'Initial text';
    const customClass = 'custom-class';

    render(<Textarea value={value} className={customClass} />);

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveClass(customClass);
  });

  test('calls onBlur with updated value when text is changed and blurred', () => {
    const initialValue = 'Initial text';
    const onBlur = vi.fn();

    render(<Textarea value={initialValue} onBlur={onBlur} />);

    const textareaElement = screen.getByRole('textbox');

    fireEvent.change(textareaElement, { target: { value: 'Updated text' } });

    expect(textareaElement).toHaveValue('Updated text');

    fireEvent.blur(textareaElement);

    expect(onBlur).toHaveBeenCalledWith('Updated text');
  });
});
