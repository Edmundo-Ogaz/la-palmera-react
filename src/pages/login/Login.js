import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { setUserSession } from '../../session/sessionStorage';
import PropTypes from 'prop-types';
import { signin } from '../../service/signin'

export default function Login(props) {
	console.log('Login')
  const [ loading, setLoading ] = useState(false);
  const [ username, setUsername ] = useState(false);
  const [ password, setPassword ] = useState(false);
  const [ error, setError ] = useState(null);

  const navigate = useNavigate();

  const style = {
    margin: '15px 0'
  };

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    signin(username, password)
    .then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.onLogIn();
      navigate('/');
    }).catch(err => {
      setLoading(false);
      if (err.response.status === 401)
	  	setError(err.response.data.message);
      else
	  	setError('Something went wrong. Please try again later.');
    });
  };

    return (
        <div className="login-container">
            <div className="title">
                Login
            </div>
            <FluidInput type="text" label="name" id="name" style={ style } onChange={ setUsername } />
            <FluidInput type="password" label="password" id="password" style={ style } onChange={ setPassword } />
            {error && <><small style={ { color: 'red' } }>{error}</small><br /></>}<br />
            <div className={ 'button login-button' } onClick={ handleLogin } disabled={ loading }>
                {loading ? 'Loading...' : 'Log in'}
            </div>
        </div>
    );
  }

function FluidInput(props) {
	const { type, label, style, id, onChange } = props;

	const [ focused, setFocused ] = React.useState(false);
    const [ value, setValue ] = React.useState('');

	function focusField() {
		// console.log(`focusField ${focused}`);
		setFocused(!focused);
	}

      function handleChange(event) {
        const { target } = event;
        setValue(target.value);
        onChange(target.value)
      }

      let inputClass = 'fluid-input';
      if (focused) {
        inputClass += ' fluid-input--focus';
      } else if (value !== '') {
        inputClass += ' fluid-input--open';
      }
      return (
          <div className={ inputClass } style={ style }>
              <div className="fluid-input-holder">
                  <input
              className="fluid-input-input"
              type={ type }
              id={ id }
              onFocus={ focusField.bind(this) }
              onBlur={ focusField.bind(this) }
              onChange={ handleChange.bind(this) }
              autoComplete="off"
            />
                  <label className="fluid-input-label" forhtml={ id }>{label}</label>
              </div>
          </div>
      );
    }

    Login.propTypes = {
		onLogIn: PropTypes.func,
      	onLogOut: PropTypes.func
    }

	FluidInput.propTypes = {
		type: PropTypes.string,
		label: PropTypes.string,
		style: PropTypes.object,
		id: PropTypes.string,
		onChange: PropTypes.func,
    }
