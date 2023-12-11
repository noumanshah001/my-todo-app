import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div>
      <p>Current Date: {formatDate(currentDateTime)}</p>
      <p>Current Time: {formatTime(currentDateTime)}</p>
    </div>
  );
};

export default Clock;
