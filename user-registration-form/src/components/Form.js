import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import mockSuccessApi from '../api/mockSuccessApi';


function Form() {
  const [usernameLengthAlert, setUsernameLengthAlert] = useState('')
  const [emailAtAlert, setEmailAtAlert] = useState('')
  const [passwordNumberAlert, setPasswordNumberAlert] = useState('')

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

      //TODO Bad to pass around this event? 
      if (inputFormKey === 'username') {
        usernameCheck(e);
      } if (inputFormKey === 'email') {
        emailCheck(e);
      } if (inputFormKey === 'password') {
        passwordCheck(e);
      }
    }
  }

  //TODO Could be done shorter using a ternary for the JSX? 
  const usernameCheck = (e) => {
    if (e.target.value.length < 6) {
      setUsernameLengthAlert('username too short')
    } else {
      setUsernameLengthAlert('')
    }
  }

  const emailCheck = (e) => {
    if (e.target.value.includes('@')) {
      setEmailAtAlert('');
    } else {
      setEmailAtAlert('Email field incomplete');
    }
  }

  const passwordCheck = (e) => {
    if (e.target.value.match(/\d+/)) {
      setPasswordNumberAlert('');
    } else {
      setPasswordNumberAlert('Password must contain a number');
    }
  }

  const formSubmit = (e) => {
    e.preventDefault()
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

    </form>
  )
}

export default Form;
// validate inputs / error messages


/*

Next Steps:

1. Input validation
-The error message should be red, it should appear below the submit button
-Once the user starts typing again in any of the input fields, the error message should disappear
-If all above criteria is met, display a "Success" message in green below the submit button

2. Mock success registration
-If all above criteria is met, upon user pressing submit there should be some indication of loading while the "api call" is being made (while the mockSuccessApi is processing)
-Once the "api call" is finished, the indication of loading should go away and a success message in green should display under the submit button
*/
