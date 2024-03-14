import React, { useState } from "react";
import styles from "./Step3.module.css";
import BackButton from "../../ui/BackButton";
import NextButton from "../../ui/NextButton";

const Step3 = (props) => {
  const [activeAddOns, setActiveAddOns] = useState([]);

  let plan = JSON.parse(sessionStorage.getItem("plan"));

  if (!plan) {
    plan = {
      planDuration: "monthly",
      activeplan: "Arcade",
    };
  }

  const AddOns = {
    "online service": plan.planDuration === "monthly" ? 1 : 10,
    "larger storage": plan.planDuration === "monthly" ? 2 : 20,
    "customizable profile": plan.planDuration === "monthly" ? 2 : 20,
  };

  const goBack = () => {
    props.stepsControllers.prevStep();
  };

  const toggleActiveAddOn = (addOnName) => {
    return () => {
      setActiveAddOns((prev) => {
        if (activeAddOns.includes(addOnName)) {
          return prev.filter((ad) => ad !== addOnName);
        } else {
          return [...prev, addOnName];
        }
      });
    };
  };

  const validateForm = () => {
    let addOns = {};

    activeAddOns.forEach((ad) => {
      addOns[ad] = AddOns[ad];
    });

    sessionStorage.setItem("addOns", JSON.stringify(addOns));

    props.stepsControllers.nextStep();
  };

  const isActiveAddOn = (addOnName) => {
    return activeAddOns.includes(addOnName);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Pick add-ons</h2>
      <span className={styles.description}>
        Add-ons help enhance your gaming experience
      </span>

      <ul className={styles["add-ons"]}>
        <li
          className={`${styles["add-on"]} ${
            isActiveAddOn("online service") ? styles["active-add-on"] : ""
          }`}
          onClick={toggleActiveAddOn("online service")}
        >
          <div className={styles["text-desc"]}>
            <div className={styles["check-box"]}>
              {/* TODO: ADD correct box here */}
            </div>

            <span className={styles.text}>
              <h3>Online service</h3>
              <span>Access to multiplayer games</span>
            </span>
          </div>

          <span className={styles.amount}>{`+$${AddOns["online service"]}/${
            plan.planDuration === "monthly" ? "mo" : "yr"
          }`}</span>
        </li>
        <li
          className={`${styles["add-on"]} ${
            isActiveAddOn("larger storage") ? styles["active-add-on"] : ""
          }`}
          onClick={toggleActiveAddOn("larger storage")}
        >
          <div className={styles["text-desc"]}>
            <div className={styles["check-box"]}>
              {/* TODO: ADD correct box here */}
            </div>

            <span className={styles.text}>
              <h3>Larger storage</h3>
              <span>Extra 1TB of cloud save</span>
            </span>
          </div>

          <span className={styles.amount}>{`+$${AddOns["larger storage"]}/${
            plan.planDuration === "monthly" ? "mo" : "yr"
          }`}</span>
        </li>
        <li
          className={`${styles["add-on"]} ${
            isActiveAddOn("customizable profile") ? styles["active-add-on"] : ""
          }`}
          onClick={toggleActiveAddOn("customizable profile")}
        >
          <div className={styles["text-desc"]}>
            <div className={styles["check-box"]}>
              {/* TODO: ADD correct box here */}
            </div>

            <span className={styles.text}>
              <h3>Customizable profile</h3>
              <span>Custome theme on your profile</span>
            </span>
          </div>

          <span className={styles.amount}>{`+$${
            AddOns["customizable profile"]
          }/${plan.planDuration === "monthly" ? "mo" : "yr"}`}</span>
        </li>
      </ul>

      <div className={styles.btns}>
        <BackButton onPrev={goBack} />
        <NextButton onNext={validateForm} />
      </div>
    </div>
  );
};

export default Step3;
