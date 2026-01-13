import { useState, useEffect } from "react";

const StepsGlow = ({ steps, color = "secondary" }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setActiveIndex(i);
      i = (i + 1) % steps.length;
    }, 1000); // 1 second per step

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <ul className="steps steps-vertical lg:steps-horizontal w-full">
      {steps &&
        steps.length > 0 &&
        steps.map((step, idx) => (
          <li key={idx} className={`step ${activeIndex === idx ? `step-${color}` : ""}`}>
            {step}
          </li>
        ))}
    </ul>
  );
};

export default StepsGlow;
