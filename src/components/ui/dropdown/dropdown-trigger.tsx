import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { SlArrowDown } from 'react-icons/sl';

interface DropdownTriggerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DropdownTrigger({
  children,
  isOpen,
  setIsOpen,
}: Readonly<DropdownTriggerProps>) {
  return (
    <div
      className={`dropdown-trigger ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen(prev => !prev)}
    >
      <span>{children ?? 'Select an option'}</span>
      <SlArrowDown className={`trigger-arrow`} />
    </div>
  );
}
