import React, { useState, useEffect } from "react";

const TypingAnimation = ({ phrases, className }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000); // Pause timeout
    } else if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((index + 1) % phrases.length);
    }

    // Timeout speed for typing and deleting phrase
    const timeout = setTimeout(
      () => {
        setSubIndex((prevSubIndex) => prevSubIndex + (reverse ? -1 : 1));
      },
      reverse ? 50 : 75 // Manage speeds here
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((vis) => !vis);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <p className={className}>
      {`${phrases[index].substring(0, subIndex)}`}
      <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
    </p>
  );
};

export { TypingAnimation };
