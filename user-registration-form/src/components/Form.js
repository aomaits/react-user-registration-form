import React, { useState } from 'react';
import mockSuccessApi from '../api/mockSuccessApi';


function Form() {

  const [usernameLengthAlert, setUsernameLengthAlert] = useState('');
  const [emailAtAlert, setEmailAtAlert] = useState('');
  const [passwordNumberAlert, setPasswordNumberAlert] = useState('');
  const [successAlert, setSuccessAlert] = useState('');

  const [inputFormValues, setInputFormValues] = useState({
    username: {
      value: '',
      validationErrorMessage'',
      validatorFn: (value) => {
        value.length > 6
      }
    }, // then loop through the state to run each validator function and for each failure populate render the error message, then run the isValid check  
    email: {
      value: '',
      validationErrorMessage'',
      validatorFn: (value) => {
        value.length > 6
      }
    },
    password: ''
  })

  const handleInputChange = (inputFormKey) => {
    return (e) => {

      // Option 1
      // setInputFormValues(prevState => {
      //   const newState = {...prevState};
      //   newState[inputFormKey] = e.target.value;
      //   return newState;
      // })

      // Option 2
      setInputFormValues({
        ...inputFormValues,
        [inputFormKey]: e.target.value
      });

      //ChatGPT helped here. This is setting the state of each alert to an empty string once the user types in the corresponding field. 

      switch (inputFormKey) {  
        case 'username':
          setUsernameLengthAlert('');
          break;
        case 'email':
          setEmailAtAlert('');
          break;
        case 'password':
          setPasswordNumberAlert('');
          break;
        default :
          break;
      }

      // Below option will remove ALL errors as soon as user starts typing, not just the corresponding error. I came up with this one. 

      // if (inputFormKey) {
      //   setUsernameLengthAlert('');
      //   setEmailAtAlert('');
      //   setPasswordNumberAlert('');
      // }
    }
  }

  const formSubmit = (e) => {
    e.preventDefault()

    //Chat GPT helped w/ the success message, I was partly there. Adding this function-scoped variable allowed me to check if there were zero alerts with creating a re-rendering loop
    let isValid = true; 

    if (inputFormValues.username.length < 6) {
      setUsernameLengthAlert('username too short')
      isValid = false; 
    } else {
      setUsernameLengthAlert('');
    }

    // TODO - email form already checks for @ inclusion! 
    if (!inputFormValues.email.includes('.com')) {
      setEmailAtAlert('Email field incomplete');
      isValid = false;
    } else {
      setEmailAtAlert('');
    }

    if (!inputFormValues.password.match(/\d+/)) {
      setPasswordNumberAlert('Password must contain a number');
      isValid  = false;
    } else {
      setPasswordNumberAlert('');
    }

    if (isValid) {
      callMockApi();
      setSuccessAlert('Submitting...');
    }
  }

  const callMockApi = async () => {
    await mockSuccessApi();
    setSuccessAlert('Submission Success!')
  }

  return (
    <form onSubmit={formSubmit}>

      <input type='text' placeholder='username' value={inputFormValues.username} onChange={handleInputChange('username')} />

      <input type='email' placeholder='email' value={inputFormValues.email} onChange={handleInputChange('email')} />

      <input type='password' placeholder='password' value={inputFormValues.password} onChange={handleInputChange('password')} />

      <button>Submit</button>
      <div class='alert'>{usernameLengthAlert}</div>
      <div class='alert'>{emailAtAlert}</div>
      <div class='alert'>{passwordNumberAlert}</div>
      <div class='success-alert'>{successAlert}</div>

    </form>
  )
}

export default Form;