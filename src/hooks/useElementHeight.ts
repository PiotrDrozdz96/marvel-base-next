import { useState, useEffect, useRef, RefObject } from 'react';
import debounce from 'debounce';

const useElementHeight = <T extends HTMLElement>(ref: RefObject<T>): number | 'auto' => {
  const [height, setHeight] = useState<number | 'auto'>('auto');

  /* eslint-disable compat/compat */
  const observer = useRef(
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(
          debounce(
            (entries) => {
              const { height: newHeight } = entries[0].contentRect;

              setHeight(newHeight);
            },
            5,
            true
          )
        )
      : { observe: () => {}, disconnect: () => {} }
  );
  /* eslint-enable compat/compat */

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (ref.current) {
      const currentObserver = observer.current;

      setHeight(ref.current.getBoundingClientRect().height);
      currentObserver.observe(ref.current);

      return () => currentObserver.disconnect();
    }
  }, [!!ref.current]); // eslint-disable-line react-hooks/exhaustive-deps

  return height;
};

export default useElementHeight;
