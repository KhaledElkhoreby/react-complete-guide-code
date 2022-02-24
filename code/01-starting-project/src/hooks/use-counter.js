import { useEffect, useState } from "react";

const useCounter = (amount) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + amount);
    }, 1000);
    return () => clearInterval(interval);
  }, [amount]);

  return counter;
};

export default useCounter;
