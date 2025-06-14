import { useState, type FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import DropdownTrigger from './dropdown-trigger';
import './dropdown.scss';
import DropdownContent from './dropdown-content';
import DropdownItem from './dropdown-item';
import { useOutsideClick } from '../../../hooks/use-outside-click';

export interface DropdownOptions {
  value: string;
  disabled?: boolean;
}

interface DropdownProps {
  placeholder?: string;
  initOptions: DropdownOptions[];
}

export default function Dropdown({ placeholder, initOptions }: Readonly<DropdownProps>) {
  // Initializing the options based on default options
  const [options, setOptions] = useState<DropdownOptions[]>(initOptions);

  const [activeOption, setActiveOption] = useState<DropdownOptions | null>(null);
  const [newOption, setNewOption] = useState('');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newOption.trim() === '') return;
    if (options.find(item => item.value.toLowerCase() === newOption.trim().toLowerCase())) return;
    const newOptionObj: DropdownOptions = {
      value: newOption.trim(),
      disabled: false,
    };
    setActiveOption(newOptionObj);
    setNewOption('');
    options.push(newOptionObj);
    setOptions([...options]);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClose);
  return (
    <div className="dropdown" ref={ref}>
      <DropdownTrigger isOpen={isOpen} setIsOpen={setIsOpen}>
        {activeOption ? activeOption.value : placeholder}
      </DropdownTrigger>
      <DropdownContent isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={e => handleSubmit(e)} className="add-option-form">
          <input
            placeholder="Add new item"
            type="text"
            value={newOption}
            onChange={e => setNewOption(e.target.value)}
          />
        </form>
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
      </DropdownContent>
    </div>
  );
}
