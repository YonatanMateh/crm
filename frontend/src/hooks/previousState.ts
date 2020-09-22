import { useEffect, useRef } from "react";

const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


const useHasChanged= (val: any) => {
    const prevVal = usePrevious(val)
    return [prevVal !== val, prevVal]
}

export {useHasChanged};