import { useRef, useState } from "react";
import styles from "./App.module.css";
import Controller from "./components/controller/Controller";
import Step1 from "./components/steps/step1/Step1";
import Step2 from "./components/steps/step2/Step2";
import Step3 from "./components/steps/step3/Step3";
import Step4 from "./components/steps/step4/Step4";
import BackButton from "./components/ui/BackButton";
import NextButton from "./components/ui/NextButton";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const validation = useRef();

  const currentStepHandler = (newStep) => {
    if (newStep < 0 || newStep >= steps.length) return;

    setCurrentStep(newStep);
  };

  const nextStep = () => {
    if (validation.current.validate) {
      const isValidated = validation.current.validateFn();
      if (!isValidated) return;

      validation.current.validate = false;
    }

    setCurrentStep((prev) => {
      if (prev > steps.length - 1) return 0;
      return ++prev;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      if (prev === 0) return steps.length - 1;
      return --prev;
    });
  };

  const stepsControllers = {
    nextStep,
    prevStep,
    setCurrentStep: currentStepHandler,
  };

  console.log("Confirmed: ", confirmed);

  const steps = [
    <Step1 stepsControllers={stepsControllers} validation={validation} />,
    <Step2 stepsControllers={stepsControllers} validation={validation} />,
    <Step3 stepsControllers={stepsControllers} validation={validation} />,
    <Step4
      stepsControllers={stepsControllers}
      validation={validation}
      confirmed={{ confirmed, setConfirmed }}
    />,
  ];

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.controller}>
          <Controller
            currentStep={currentStep}
            stepsControllers={stepsControllers}
          />
        </div>
        <div className={styles.content}>{steps[currentStep]}</div>
        <div className={`${styles.btns} ${confirmed ? styles.hide : ""}`}>
          <BackButton onPrev={prevStep} />
          <NextButton className={styles["btn--confirm"]} onNext={nextStep}>
            {currentStep === 3 ? "Confirm" : "Next Step"}
          </NextButton>
        </div>
      </div>
    </main>
  );
}

export default App;
