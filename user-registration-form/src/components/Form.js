import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import mockSuccessApi from '../api/mockSuccessApi';


function Form() {
  const [usernameLengthAlert, setUsernameLengthAlert] = useState('')
  const [emailAtAlert, setEmailAtAlert] = useState('')

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
      /* 
      1. Restructure to actually use the error? 
      2. Make it shorter?
      3. Lags as inputvalues are added, how to catch it up? 
      */
      if (inputFormKey === 'username') {
        usernameCheck(e);
      } if (inputFormKey === 'email') {
        emailCheck();
      } if (inputFormKey === 'password') {
        passwordCheck();
      }
    }
  }

  const usernameCheck = (e) => {
    // console.log('usernameCheck running')
    if (e.target.value.length < 6) {
      // console.log("username too short")
      setUsernameLengthAlert('username too short')
    } else {
      setUsernameLengthAlert('')
      // console.log("username not too short")
    }
    //   console.log(e.target.value)
  }

  const emailCheck = () => {
    console.log('emailCheck running')
  }

  const passwordCheck = () => {
    console.log('passwordCheck running')
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
      <div>{usernameLengthAlert}</div>
      <input type='email' placeholder='email' value={inputFormValues.email} onChange={handleInputChange('email')} /> {/*email*/}
      <div>{emailAtAlert}</div>
      <input type='password' placeholder='password' value={inputFormValues.password} onChange={handleInputChange('password')} /> {/*password*/}
      <button>Submit</button>
      <div />
    </form>
  )
}

export default Form;
// validate inputs / error messages


/*

Next Steps:

1. Input validation
-If a username is less than 6 characters, display an error message saying so
-If an email does not contain an "@" sign, display an error message saying so
-If a password does not contain at least 1 numbner, display an error message saying so
-The error message should be red, it should appear below the submit button
-Once the user starts typing again in any of the input fields, the error message should disappear
-If all above criteria is met, display a "Success" message in green below the submit button

2. Mock success registration
-If all above criteria is met, upon user pressing submit there should be some indication of loading while the "api call" is being made (while the mockSuccessApi is processing)
-Once the "api call" is finished, the indication of loading should go away and a success message in green should display under the submit button
*/
