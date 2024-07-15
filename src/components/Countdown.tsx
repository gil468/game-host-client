import React, { useState, useEffect } from 'react';
import './Countdown.css';

interface CountdownProps {
  onEnd: () => void;
}

const CountdownExample = (props: CountdownProps) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setTimeout(() => {
      countdown > 1 ? setCountdown(countdown - 1) : props.onEnd();
    }, 1000);
  }, [countdown, props.onEnd]);

  return (
    <div className="countdown-popup">
      <h1 className="countdown-number">{countdown}</h1>
    </div>
  );
};

export default CountdownExample;
