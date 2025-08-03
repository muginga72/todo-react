import React from 'react';

function TextInputWithLabel({ elementId, labelText, onChange, value, inputRef }) {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        id={elementId}
        type="text"
        ref={inputRef}
        value={value}
        onChange={onChange}
        style={{ marginLeft: "10px" }}
      />
    </>
  );
}

export default TextInputWithLabel;