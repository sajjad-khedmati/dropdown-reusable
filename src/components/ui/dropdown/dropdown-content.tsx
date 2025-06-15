import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { DropdownOptions } from '.';

import { v4 as uuid } from 'uuid';
import DropdownItem from './dropdown-item';

interface DropdownContentProps {
  isOpen: boolean;
  children: ReactNode;
  options: DropdownOptions[];
  activeOption: DropdownOptions | null;
  setActiveOption: Dispatch<SetStateAction<DropdownOptions | null>>;
}

export default function DropdownContent({
  isOpen,
  children,
  options,
  activeOption,
  setActiveOption,
}: Readonly<DropdownContentProps>) {
  return (
    <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>
      {children}
      {/* Dropdown options list */}
      <div className="option-box">
        {options.map(option => (
          <button
            disabled={option.disabled}
            key={uuid()}
            onClick={() => {
              if (option.disabled) return;
              setActiveOption(option);
            }}
          >
            <DropdownItem
              value={option.value}
              disabled={option.disabled}
              isSelected={option.value === activeOption?.value}
            />
          </button>
        ))}
      </div>
      {options.length === 0 && <div className="no-options">No options available</div>}
    </div>
  );
}
