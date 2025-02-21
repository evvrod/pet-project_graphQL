import { vi, describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import ParameterSection from './ParameterSection';

interface ITabsNavigation {
  sections: string[];
  visibleSection: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

vi.mock('components/TabsNavigation/TabsNavigation', () => ({
  default: ({ sections, onClick }: ITabsNavigation) => (
    <div>
      {sections.map((section: string) => (
        <button key={section} name={section} onClick={onClick}>
          {section}
        </button>
      ))}
    </div>
  ),
}));

describe('ParameterSection', () => {
  test('renders and handles section switching', () => {
    const children = [
      <div key="1" data-section="section1">
        Section 1
      </div>,
      <div key="2" data-section="section2">
        Section 2
      </div>,
      <div key="3" data-section="section3">
        Section 3
      </div>,
    ];

    render(<ParameterSection>{children}</ParameterSection>);

    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.queryByText('Section 2')).toBeNull();
    expect(screen.queryByText('Section 3')).toBeNull();

    fireEvent.click(screen.getByText('section2'));

    expect(screen.queryByText('Section 1')).toBeNull();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.queryByText('Section 3')).toBeNull();

    fireEvent.click(screen.getByText('section3'));

    expect(screen.queryByText('Section 1')).toBeNull();
    expect(screen.queryByText('Section 2')).toBeNull();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });
});
