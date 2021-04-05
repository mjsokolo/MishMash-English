import React, { useEffect, useRef } from 'react';
import autosize from 'autosize';

export default function TextArea(props) {
  const { onChange, value, id, ...filteredProps } = props;
  const textareaRef = useRef();
  useEffect(() => {
    autosize(textareaRef.current);
  }, [value, textareaRef]);
  return (
    <textarea
      {...filteredProps}
      value={value}
      ref={textareaRef}
      onChange={(event) => {
        onChange(id, event);
      }}
    ></textarea>
  );
}
