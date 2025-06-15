import { useEffect, useRef, useState, type FormEvent } from 'react';
import DropdownTrigger from './dropdown-trigger';
import './dropdown.scss';
import DropdownContent from './dropdown-content';
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
  //* Initializing the options based on default options
  const [options, setOptions] = useState<DropdownOptions[]>(initOptions);

  const [activeOption, setActiveOption] = useState<DropdownOptions | null>(null);
  const [newOption, setNewOption] = useState('');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  //* dropdown content direction handle
  const [dropUp, setDropUp] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newOption.trim() === '') return;
    // ? prevent from duplicate items inside the option list
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

  useEffect(() => {
    // ? this for dropdown options direction - if the screen height is less than the
    // ? modal size , then open it on the top of dropdown trigger
    // * thats important for responsive design
    if (!isOpen || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 300 && spaceAbove > 300) {
      setDropUp(true);
    } else {
      setDropUp(false);
    }
  }, [isOpen]);

  const ref = useOutsideClick<HTMLDivElement>(handleClose);
  return (
    <div className={`dropdown ${dropUp ? 'drop-up' : ''}`} ref={ref}>
      <div ref={triggerRef}>
        <DropdownTrigger isOpen={isOpen} setIsOpen={setIsOpen}>
          {activeOption ? activeOption.value : placeholder}
        </DropdownTrigger>
      </div>
      <DropdownContent
        isOpen={isOpen}
        options={options}
        activeOption={activeOption}
        setActiveOption={setActiveOption}
      >
        {/* Dropdown add options */}
        <form onSubmit={e => handleSubmit(e)} className="add-option-form">
          <input
            placeholder="Add new item"
            type="text"
            value={newOption}
            onChange={e => setNewOption(e.target.value)}
          />
        </form>
      </DropdownContent>
    </div>
  );
}
