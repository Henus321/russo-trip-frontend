import { useEffect, useRef } from "react";

interface Props {
  func: () => void;
}

const OnUnmount = ({ func }: Props) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    return () => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      func();
    };
  }, [func]);

  return null;
};

export default OnUnmount;
