import React from "react";
import styles from "./NextButton.module.css";

const NextButton = (props) => {
  return (
    <button type="text" className={styles["next-btn"]} onClick={props.onNext}>
      Next Step
    </button>
  );
};

export default NextButton;
