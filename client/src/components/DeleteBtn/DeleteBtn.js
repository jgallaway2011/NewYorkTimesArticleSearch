import React from "react";
import "./DeleteBtn.css";

const DeleteBtn = props => (
  <span className="delete-btn" {...props}>
    <strong>✗</strong>
  </span>
);

export default DeleteBtn;
