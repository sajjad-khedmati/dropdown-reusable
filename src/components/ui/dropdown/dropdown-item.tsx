import { IoCheckmarkOutline } from 'react-icons/io5';
import type { DropdownOptions } from '.';

export default function DropdownItem({
  value,
  disabled,
  isSelected,
}: Readonly<Omit<DropdownOptions, 'id'> & { isSelected?: boolean }>) {
  return (
    <div
      aria-disabled={disabled}
      className={`dropdown-item ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
    >
      <span>{value}</span>
      {isSelected && <IoCheckmarkOutline />}
    </div>
  );
}
