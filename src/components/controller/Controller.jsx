import React from "react";
import styles from "./Controller.module.css";
import bgImage from "../../resources/multi-step-form-main/assets/images/bg-sidebar-desktop.svg";

const Controller = (props) => {
  const { currentStep } = props;
  const setCurrentStep = props.stepsControllers.setCurrentStep;
  console.log("Rerendering: ", currentStep);
  const steps = [
    {
      number: 1,
      title: "YOUR INFO",
    },

    {
      number: 2,
      title: "SELECT PLAN",
    },
    {
      number: 3,
      title: "ADD-ONS",
    },

    {
      number: 4,
      title: "SUMMARY",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <img src={bgImage} className={styles.img} alt="background" />
      <nav className={styles.nav}>
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrentStep(index);
              }}
              className={`${styles["step-wrapper"]} ${
                currentStep === index ? styles["active-tab"] : ""
              }`}
            >
              <div className={styles["step-number-wrapper"]}>
                <span className={styles["step-number"]}>{step.number}</span>
              </div>

              <div className={styles["step-content"]}>
                <span
                  className={styles["step-name"]}
                >{`STEP ${step.number}`}</span>
                <span className={styles["step-title"]}>{step.title}</span>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Controller;
