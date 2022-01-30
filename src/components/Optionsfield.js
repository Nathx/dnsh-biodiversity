import React from "react";

const Optionsfield = (props) => {
  const renderOptions = (option, i) => {
    return (
      <label key={i} className="toggle-container">
        <input
          onChange={() => props.changeState(i)}
          checked={option.layer === props.layer}
          name="toggle"
          type="radio"
        />
        <div className="toggle txt-s py3 toggle--active-white">
          {option.name}
        </div>
      </label>
    );
  };
  return (
    <div className="toggle-group border border--2 border--white bg-white shadow-darken10 z1">
      {props.options.map(renderOptions)}
    </div>
  );
};

export default Optionsfield;
