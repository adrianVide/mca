import { useState, useEffect } from "react";

const fetchFixedValues = async () => {
  try {
    const response = await fetch("http://demo1209414.mockable.io/fixed");
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error("Error fetching range values:", error);
    return [];
  }
};

const FixedRange = () => {
  const [rangeValues, setRangeValues] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const handleMouseDown = (bullet, setFunc) => (event) => {
    event.preventDefault();
    const isMin = bullet === "min";
    const initialX = event.clientX;
    const initialValue = bullet === "min" ? minValue : maxValue;
    const sliderWidth = event.target.parentElement.clientWidth;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - initialX;
      const stepIndex = rangeValues.indexOf(initialValue);
      const stepWidth = sliderWidth / (rangeValues.length - 1);
      const stepDelta = Math.round(deltaX / stepWidth);
      const newIndex = stepIndex + stepDelta;
      const newValue =
        rangeValues[Math.max(0, Math.min(rangeValues.length - 1, newIndex))];

      if (isMin && newValue >= maxValue) return;
      if (!isMin && newValue <= minValue) return;
      setFunc(newValue);
    };
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const formatValue = (value) => {
    return `${value.toFixed(2)}€`;
  };

  useEffect(() => {
    const getRangeValues = async () => {
      const values = await fetchFixedValues();
      setRangeValues(values);
      setMinValue(values[0]);
      setMaxValue(values[values.length - 1]);
    };
    getRangeValues();
  }, []);
  if (!rangeValues.length) return <div className="loading">Loading...</div>;
  return (
    <div className="range-slider">
      <div className="slider-track">
        <div
          className="slider-bullet"
          style={{
            left: `${
              (rangeValues.indexOf(minValue) / (rangeValues.length - 1)) * 100
            }%`,
          }}
          onMouseDown={handleMouseDown("min", setMinValue)}
        />
        <div
          className="slider-bullet"
          style={{
            left: `${
              (rangeValues.indexOf(maxValue) / (rangeValues.length - 1)) * 100
            }%`,
          }}
          onMouseDown={handleMouseDown("max", setMaxValue)}
        />
      </div>
      <div className="values">
        <span className="value-label">{formatValue(minValue)}</span>
        <span className="value-label">{formatValue(maxValue)}</span>
      </div>
    </div>
  );
};

export default FixedRange;
