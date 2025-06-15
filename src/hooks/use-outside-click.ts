import { useEffect, useRef } from 'react';

export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  //? i have using the callback method call for the handle custom diffrent actions
  //* with this logic , we can trigger diffrent actions when the click on close dropdown
  //* such as : api call after close to save new options for optimistic update reasons etc.
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      event.stopPropagation();
      //? detect outside of ref click
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
