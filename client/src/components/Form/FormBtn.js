import React from "react";
import "./Form.css";

export const FormBtn = props => (
  <button {...props} style={{ float: "left", marginBottom: 10 }} className="btn btn-success">
    {props.children}
  </button>
);