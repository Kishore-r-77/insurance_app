import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setcurrentStepIndex] = useState(0);

  function next() {
    setcurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }
  function back() {
    setcurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }
  function goTo(index: number) {
    setcurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goTo,
    next,
    back,
    steps,
  };
}
