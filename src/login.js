import React from "react";

import './login.css';

function FluidInput(props) {
  const [focused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState("");

    const { type, label, style, id } = props;

    function focusField() {
      console.log(`focusField ${focused}`);
      setFocused(!focused);
    }

    function handleChange(event) {
      const { target } = event;
      const { value } = target;
      console.log(`handleChange ${value}`);
      setValue(value);
    }

    let inputClass = "fluid-input";
    if (focused) {
      inputClass += " fluid-input--focus";
    } else if (value != "") {
      inputClass += " fluid-input--open";
    }
    return (
      <div className={inputClass} style={style}>
        <div className="fluid-input-holder">
          <input
            className="fluid-input-input"
            type={type}
            id={id}
            onFocus={focusField.bind(this)}
            onBlur={focusField.bind(this)}
            onChange={handleChange.bind(this)}
            autoComplete="off"
          />
          <label className="fluid-input-label" forHtml={id}>{label}</label>
        </div>
      </div>
    );
  }

function Button(props) {
    return (
      <div className={`button ${props.buttonClass}`} onClick={props.onClick}>
        {props.buttonText}
      </div>
    );
  }

function Login() {
  const style = {
    margin: "15px 0"
  };

  function onclick() {
    console.log("onclick");
  }

    return (
      <div className="login-container">
        <div className="title">
         Login
        </div>
        <FluidInput type="text" label="name" id="name" style={style} />
        <FluidInput type="password" label="password" id="password" style={style} />
        <Button buttonText="log in" buttonClass="login-button" onClick={onclick}/>
      </div>
    );
  }

export default Login;
