import React, { useEffect, useState } from "react";
import styles from "./Step4.module.css";
import BackButton from "../../ui/BackButton";
import NextButton from "../../ui/NextButton";
import Confirm from "./Confirm";

const Step4 = (props) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotal] = useState(0);
  // const [confirmed, setConfirmed] = useState(false);

  const { confirmed, setConfirmed } = props.confirmed;
  const parseUserData = () => {
    const plan = JSON.parse(sessionStorage.getItem("plan"));
    const addOns = JSON.parse(sessionStorage.getItem("addOns"));

    setUserData({ plan, addOns });

    const addOnList = Object.values(addOns);
    const total =
      addOnList.length > 0
        ? addOnList.reduce((val, acc) => acc + val) + plan.activePlanAmount
        : plan.activePlanAmount;

    setTotal(total);
  };

  useEffect(() => {
    setIsLoading(true);
    parseUserData();
    setIsLoading(false);
  }, []);

  const goBack = () => {
    props.stepsControllers.prevStep();
  };

  const confirmHandler = () => {
    console.log("Here...");
    setConfirmed(true);
  };

  const changePlanHandler = () => {
    props.stepsControllers.setCurrentStep(2);
  };

  if (confirmed) return <Confirm />;

  if (isLoading) return <span className={styles.loading}>Loading...</span>;

  return (
    <div className={styles.wrapper}>
      <h2>Finishing Up</h2>
      <span className={styles.description}>
        Double check everything looks OK before confriming
      </span>

      <div className={styles["confirm-box"]}>
        <div className={styles["plan-box"]}>
          <div className={styles["plan-duration"]}>
            <span>
              <span className={styles.plan}>{userData.plan.activePlan}</span>
              <span className={styles.duration}>
                {" "}
                ({userData.plan.planDuration})
              </span>
            </span>
            <span className={styles["change-plan"]} onClick={changePlanHandler}>
              change
            </span>
          </div>
          <span className={styles.amount}>{`$${
            userData.plan.activePlanAmount
          }/${userData.plan.duration === "monthly" ? "mo" : "yr"}`}</span>
        </div>

        <div className={styles.divider}></div>

        <ul className={styles["add-ons"]}>
          {Object.entries(userData.addOns).map((entry, index) => {
            return (
              <li key={index} className={styles["add-on"]}>
                <span className={styles["add-on-name"]}>{entry[0]}</span>
                <span className={styles["add-on-amount"]}>{`+$${entry[1]}/${
                  userData.plan.duration === "monthly" ? "mo" : "yr"
                }`}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles["total"]}>
        <span className={styles["total--name"]}>Total (per month)</span>
        <span className={styles["total--amount"]}>{`+$${totalAmount}/${
          userData.plan.duration === "monthly" ? "mo" : "yr"
        }`}</span>
      </div>
      <div className={styles.btns}>
        <BackButton onPrev={goBack} />
        <NextButton className={styles["btn--confirm"]} onNext={confirmHandler}>
          Confirm
        </NextButton>
      </div>
    </div>
  );
};

export default Step4;
