import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface DropdownContentProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DropdownContent({ isOpen, children }: Readonly<DropdownContentProps>) {
  return <div className={`dropdown-content ${isOpen ? 'open' : ''}`}>{children}</div>;
}
