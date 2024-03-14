import React from "react";
import styles from "./BackButton.module.css";

const BackButton = (props) => {
  return (
    <button type="text" className={styles.btn} onClick={props.onPrev}>
      Go Back
    </button>
  );
};

export default BackButton;
