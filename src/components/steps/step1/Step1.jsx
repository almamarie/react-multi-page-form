import React, { useRef, useState } from "react";
import styles from "./Step1.module.css";
import NextButton from "../../ui/NextButton";

const Step1 = (props) => {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef();

  const [error, setError] = useState([]);
  const validateEmail = () => {
    console.log("Here... mail");
    const email = emailRef.current.value;
    const isValid = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!isValid && !error.includes("email")) {
      setError((prev) => [...prev, "email"]);
      return false;
    } else {
      setError((prev) => prev.filter((fi) => fi !== "email"));
    }
    return true;
  };

  const validateName = () => {
    const name = nameRef.current.value;

    if (name.length < 2 && !error.includes("name")) {
      setError((prev) => [...prev, "name"]);
      return false;
    } else {
      setError((prev) => prev.filter((fi) => fi !== "name"));
    }
    return true;
  };

  const validatePhone = () => {
    const phoneNumber = phoneRef.current.value;

    if (phoneNumber.toString().length < 7 && !error.includes("phoneNumber")) {
      setError((prev) => [...prev, "phoneNumber"]);
      return false;
    } else {
      setError((prev) => prev.filter((fi) => fi !== "phoneNumber"));
    }

    return true;
  };

  const validateForm = () => {
    if (!validateName() || !validateEmail() || !validatePhone()) return;

    const personalInfo = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneRef.current.value,
    };

    sessionStorage.setItem("personalInfo", JSON.stringify(personalInfo));

    props.stepsControllers.nextStep();
  };

  return (
    <div className={styles.wrapper}>
      <h2>Personal info</h2>
      <span className={styles.description}>
        Please provide your name, email address, and phone number
      </span>

      <div className={styles.inputs}>
        <div className={styles["input-wrapper"]}>
          <label className={styles.label} htmlFor="name">
            <span>Name</span>
            <span
              className={`${styles["error-text"]} ${
                error.includes("name") ? styles.show : ""
              }`}
            >
              This field is required
            </span>
          </label>
          <input
            className={`${styles.input} ${
              error.includes("name") ? styles.error : ""
            }`}
            ref={nameRef}
            id="name"
            type="text"
            placeholder="name"
          />
        </div>

        <div className={styles["input-wrapper"]}>
          <label className={styles.label} htmlFor="email">
            <span>Email Address</span>
            <span
              className={`${styles["error-text"]} ${
                error.includes("email") ? styles.show : ""
              }`}
            >
              This field is required
            </span>
          </label>
          <input
            className={`${styles.input} ${
              error.includes("email") ? styles.error : ""
            }`}
            ref={emailRef}
            id="email"
            type="email"
            placeholder="name"
          />
        </div>

        <div className={styles["input-wrapper"]}>
          <label className={styles.label} htmlFor="phone">
            <span>Phone number</span>
            <span
              className={`${styles["error-text"]} ${
                error.includes("phoneNumber") ? styles.show : ""
              }`}
            >
              This field is required
            </span>
          </label>
          <input
            className={`${styles.input} ${
              error.includes("phoneNumber") ? styles.error : ""
            }`}
            ref={phoneRef}
            id="phone"
            type="text"
            placeholder="e.g +1 234 567 890"
          />
        </div>
      </div>

      <div className={styles["next-btn-wrapper"]}>
        <NextButton onNext={validateForm} />
      </div>
    </div>
  );
};

export default Step1;
