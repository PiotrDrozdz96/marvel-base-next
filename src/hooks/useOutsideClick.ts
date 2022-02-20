import { RefObject, ChangeEvent, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandleClick = any;

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencyArray?: any[]
): void => {
  useEffect(() => {
    const handleClick = (e: ChangeEvent<T>) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick as HandleClick);

    return () => {
      document.removeEventListener('click', handleClick as HandleClick);
    };
  }, dependencyArray); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useOutsideClick;
