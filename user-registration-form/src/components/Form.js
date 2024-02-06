import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import mockSuccessApi from '../api/mockSuccessApi';


function Form() {
  const [usernameLengthAlert, setUsernameLengthAlert] = useState('');
  const [emailAtAlert, setEmailAtAlert] = useState('');
  const [passwordNumberAlert, setPasswordNumberAlert] = useState('');
  // successAlert will be initialized as an empty string
  const [successAlert, setSuccessAlert] = useState('');

  const [inputFormValues, setInputFormValues] = useState({
    username: '',
    email: '',
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

    if (e.target[0].value.length < 6) {
      setUsernameLengthAlert('username too short')
      isValid = false; 
    } else {
      setUsernameLengthAlert('');
    }

    // TODO - email form already checks for @ inclusion! 
    if (!e.target[1].value.includes('.com')) {
      setEmailAtAlert('Email field incomplete');
      isValid = false;
    } else {
      setEmailAtAlert('');
    }

    if (!e.target[2].value.match(/\d+/)) {
      setPasswordNumberAlert('Password must contain a number');
      isValid  = false;
    } else {
      setPasswordNumberAlert('');
    }

    if (isValid) {
      setSuccessAlert('Success!');
    }
  }

  const callMockApi = async () => {
    await mockSuccessApi();
    console.log('done')
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
// validate inputs / error messages


/*

Next Steps:

1. Input validation
-If all above criteria is met, display a "Success" message in green below the submit button

2. Mock success registration
-If all above criteria is met, upon user pressing submit there should be some indication of loading while the "api call" is being made (while the mockSuccessApi is processing)
-Once the "api call" is finished, the indication of loading should go away and a success message in green should display under the submit button
*/
