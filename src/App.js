import { useState } from "react";
import styles from "./App.module.css";
import Controller from "./components/controller/Controller";
import Step1 from "./components/steps/step1/Step1";
import Step2 from "./components/steps/step2/Step2";
import Step3 from "./components/steps/step3/Step3";
import Step4 from "./components/steps/step4/Step4";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const currentStepHandler = (newStep) => {
    if (newStep < 0 || newStep >= steps.length) return;

    setCurrentStep(newStep);
  };

  const nextStep = () => {
    console.log("Here=---=-=--");
    setCurrentStep((prev) => {
      // return 3;
      if (prev > steps.length - 1) return 0;
      console.log(prev + 1);
      return ++prev;
    });
  };

  const prevStep = () => {
    setCurrentStep((prev) => {
      if (prev === 0) return steps.length - 1;
      return --prev;
    });
  };

  console.log("Current step: ", currentStep);

  const stepsControllers = {
    nextStep,
    prevStep,
    setCurrentStep: currentStepHandler,
  };

  const steps = [
    <Step1 stepsControllers={stepsControllers} />,
    <Step2 stepsControllers={stepsControllers} />,
    <Step3 stepsControllers={stepsControllers} />,
    <Step4 stepsControllers={stepsControllers} />,
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
      </div>
    </main>
  );
}

export default App;
