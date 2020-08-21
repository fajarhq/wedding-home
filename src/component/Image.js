import React from "react";

const Image = ({ src, remove }) => {
  return (
    <>
      <img style={{ width: "150px" }} src={src} />
      <button type="button" onClick={() => remove()}>x</button>
    </>
  );
};

export default Image;
