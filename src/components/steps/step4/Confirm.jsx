import React from "react";
import styles from "./Confirm.module.css";

const Confirm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["icon-wrapper"]}>
        <div className={styles["icon-white-box"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            className={styles.svg}
          >
            <path
              className={styles.svg}
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              d="m1 4 3.433 3.433L10.866 1"
            />
          </svg>
        </div>
      </div>

      <span className={styles["thank-you"]}>Thank you!</span>
      <p className={styles.p}>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};

export default Confirm;
