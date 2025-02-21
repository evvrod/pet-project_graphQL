import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import KeyValueEditor from './KeyValueEditor';

vi.mock('UI components/index', () => ({
  ButtonWithIcon: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>Delete</button>
  ),
}));

describe('KeyValueEditor', () => {
  const mockOnBlur = vi.fn();

  const initialValues = {
    key1: 'value1',
    key2: 'value2',
  };

  test('renders correctly with initial values', () => {
    render(
      <KeyValueEditor
        values={initialValues}
        onBlur={mockOnBlur}
        requiredValues={{}}
      />,
    );

    const keyInputs = screen.getAllByPlaceholderText('Key');
    const valueInputs = screen.getAllByPlaceholderText('Value');

    expect(keyInputs[0]).toHaveValue('key1');
    expect(valueInputs[0]).toHaveValue('value1');
    expect(keyInputs[1]).toHaveValue('key2');
    expect(valueInputs[1]).toHaveValue('value2');

    expect(keyInputs[2]).toHaveValue('');
    expect(valueInputs[2]).toHaveValue('');
  });

  test('handles input changes correctly', () => {
    render(
      <KeyValueEditor
        values={initialValues}
        onBlur={mockOnBlur}
        requiredValues={{}}
      />,
    );

    const [keyInput] = screen.getAllByPlaceholderText('Key');
    const [valueInput] = screen.getAllByPlaceholderText('Value');

    fireEvent.change(keyInput, { target: { value: 'newKey' } });
    fireEvent.change(valueInput, { target: { value: 'newValue' } });

    expect(keyInput).toHaveValue('newKey');
    expect(valueInput).toHaveValue('newValue');
  });

  test('calls onBlur when blur event occurs', async () => {
    render(
      <KeyValueEditor
        values={initialValues}
        onBlur={mockOnBlur}
        requiredValues={{}}
      />,
    );

    const [keyInput] = screen.getAllByPlaceholderText('Key');
    const [valueInput] = screen.getAllByPlaceholderText('Value');

    fireEvent.blur(keyInput);

    fireEvent.blur(valueInput);

    await waitFor(() => {
      expect(mockOnBlur).toHaveBeenCalledTimes(2);
    });
  });

  test('adds a new empty pair when there is no empty pair in the list', () => {
    render(
      <KeyValueEditor
        values={initialValues}
        onBlur={mockOnBlur}
        requiredValues={{}}
      />,
    );

    const keyInputs = screen.getAllByPlaceholderText('Key');
    expect(keyInputs).toHaveLength(3);

    fireEvent.change(keyInputs[2], { target: { value: 'newKey' } });

    const valueInputs = screen.getAllByPlaceholderText('Value');
    expect(valueInputs).toHaveLength(3);
  });

  test('handles deletion of a pair correctly', async () => {
    render(
      <KeyValueEditor
        values={initialValues}
        onBlur={mockOnBlur}
        requiredValues={{}}
      />,
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const updatedKeyInputs = screen.getAllByPlaceholderText('Key');
      expect(updatedKeyInputs).toHaveLength(2);
    });
  });
});
