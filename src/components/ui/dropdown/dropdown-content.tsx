import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useOutsideClick } from '../../../hooks/use-outside-click';

interface DropdownContentProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DropdownContent({
  isOpen,
  setIsOpen,
  children,
}: Readonly<DropdownContentProps>) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClose);
  return (
    <div ref={ref} className={`dropdown-content ${isOpen ? 'open' : ''}`}>
      {children}
    </div>
  );
}
