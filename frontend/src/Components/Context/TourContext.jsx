import { createContext, useContext, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [steps, setSteps] = useState([]);
  const [isTourActive, setIsTourActive] = useState(false);

  // Agrega pasos desde cualquier componente
  const addStep = (step) => {
    setSteps((prev) => [...prev, step]);
  };

  // Inicia la inducción guiada
  const startTour = () => {
    if (steps.length === 0) return;
    const tutorial = driver({
      showProgress: true,
      steps,
      onDestroyed: () => {
        localStorage.setItem("hasCompletedTour", "true");
      },
    });
    tutorial.drive();
    setIsTourActive(true);
  };

  return (
    <TourContext.Provider value={{ addStep, startTour, isTourActive }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
