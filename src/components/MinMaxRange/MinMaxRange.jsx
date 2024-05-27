import { useState, useEffect } from "react";

const fetchRangeValues = async () => {
  try {
    const response = await fetch("http://demo1209414.mockable.io/minmax");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching range values:", error);
    return { min: 0, max: 0 }; // Return default values in case of an error
  }
};

const MinMaxRange = () => {
  const [rangeValues, setRangeValues] = useState();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const handleMouseDown =
    (bullet, setFunc, oppositeValue, isMin) => (event) => {
      event.preventDefault();
      const initialX = event.clientX;
      const initialValue = bullet === "min" ? minValue : maxValue;
      const sliderWidth = event.target.parentElement.clientWidth;

      const handleMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - initialX;
        const deltaValue =
          (rangeValues.max - rangeValues.min) * (deltaX / sliderWidth);
        const newValue = isMin
          ? Math.min(
              oppositeValue - 1,
              Math.max(rangeValues.min, initialValue + deltaValue)
            )
          : Math.max(
              oppositeValue + 1,
              Math.min(rangeValues.max, initialValue + deltaValue)
            );

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
    const parsedValue = parseFloat(value);
    let formattedNumber = parsedValue.toFixed(2);
    if (formattedNumber.endsWith(".00")) {
      return parseInt(formattedNumber);
    }
    return formattedNumber;
  };

  const handleManualSet = (limit) => (event) => {
    event.preventDefault();
    const newValue = prompt(
      "Enter a value",
      limit === "min" ? formatValue(minValue) : formatValue(maxValue)
    );
    if (newValue === null) {
      return;
    }
    const parsedValue = parseFloat(newValue);
    if (isNaN(parsedValue)) {
      alert("Please enter a valid number");
      return;
    }
    if (limit === "min") {
      setMinValue(parsedValue);
    } else {
      setMaxValue(parsedValue);
    }
  };

  useEffect(() => {
    const getRangeValues = async () => {
      const data = await fetchRangeValues();
      setRangeValues(data);
      setMinValue(data.min);
      setMaxValue(data.max);
    };
    getRangeValues();
  }, []);

  if (!rangeValues) return <div className="loading">Loading...</div>;
  return (
    <div className="range-slider">
      <div className="slider-track">
        <div
          className="slider-bullet"
          style={{
            left: `${
              ((minValue - rangeValues.min) /
                (rangeValues.max - rangeValues.min)) *
              100
            }%`,
          }}
          onMouseDown={handleMouseDown("min", setMinValue, maxValue, true)}
        />
        <div
          className="slider-bullet"
          style={{
            left: `${
              ((maxValue - rangeValues.min) /
                (rangeValues.max - rangeValues.min)) *
              100
            }%`,
          }}
          onMouseDown={handleMouseDown("max", setMaxValue, minValue, false)}
        />
      </div>
      <div className="values">
        <span className="value-label" onClick={handleManualSet("min")}>
          {formatValue(minValue)}€
        </span>
        <span className="value-label" onClick={handleManualSet("max")}>
          {formatValue(maxValue)}€
        </span>
      </div>
    </div>
  );
};

export default MinMaxRange;
