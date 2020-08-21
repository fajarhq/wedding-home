import React from "react";

const FileInput = ({ name, setFieldValue, remove }) => {
  return (
    <div>
      <input
        name
        onChange={(event) => {
          setFieldValue(name, event.currentTarget.files[0]);
        }}
        name="image"  accept="image/*"
        style={{
          padding: "10px",
          borderRadius: "10px",
          width: "30%",
        }}
        type="file"
      />
      <button onClick={() => remove()}>x</button>
    </div>
  );
};

export default FileInput;
