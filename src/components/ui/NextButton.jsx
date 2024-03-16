import React from "react";
import styles from "./NextButton.module.css";

const NextButton = (props) => {
  return (
    <button
      type="text"
      className={`${styles["next-btn"]} ${props.className || ""}`}
      onClick={props.onNext}
    >
      {props.children || "Next Step"}
    </button>
  );
};

export default NextButton;
