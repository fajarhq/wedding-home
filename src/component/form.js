import React from "react";

import { Formik, Field } from "formik";

export const Form = ({
  validate,
  initialValues,
  onSubmit,
  render,
  enableReinitialize,
}) => {
  return (
    <Formik enableReinitialize
      validate={validate}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(props) => render(props)}
    </Formik>
  );
};
