import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../Router/routes';

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '2px 6px 10px rgba(0, 0, 0, 0.6)',
      width: '300px',
    },
    input: {
      marginBottom: '35px',
      padding: '10px',
      fontSize: '16px',
      border: 'none',
      outline: 'none',
      borderBottom: '2px solid grey',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      color: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
      marginBottom: '10px',
      backgroundColor: 'black'
    },
    title: {
      marginBottom: '30px',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: {
      marginTop: '20px',
      textAlign: 'center',
      marginRight:"4px"
    },
    signup: {
        color: '#007bff',
        marginTop: '20px',
        textAlign: 'center',
        cursor: 'pointer',
    },
    signupdiv: {
        display: 'flex',
        justifyContent: 'center',
    },
    errorBorder: {
      borderBottom: '2px solid red',
  },
  };

const LoginForm = () => {

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const navigateSignUp = () => {
    navigate(AppRoutes.signup);
  }

  const handleSubmit = async (e) => {
    try {
      if(loginData?.email !== "" && loginData?.password !== ""){
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailRegex.test(loginData?.email)){
          setErrors(true);
          alert("Please enter a valid email [eg: abc@gmail.com]")
          return;
         }
          setErrors(false)
          const response = await axios.post('http://localhost:5000/login', loginData);
          console.log(response)
          if(response.data.error === false){
              localStorage.setItem("JWTToken", response.data.token);
              navigate(AppRoutes.userList);
          } else {
            setLoginData({
                email:"",
                password:""
              });
            localStorage.removeItem("JWTToken", response.data.token);
            alert("Invalid Login")
          }
      } else {
        setErrors(true)
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={styles.container}>
    <form style={styles.form}>
      <div style={styles.title}>Login</div>
      <input
        type="email"
        name="email"
        placeholder="Email ID"
        onChange={(e)=>handleChange(e)}
        required
        autoFocus
        value={loginData?.email}
        style={{
          ...styles.input,
          ...(errors && !loginData?.email ? styles.errorBorder : {}),
          }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e)=>handleChange(e)}
        required
        value={loginData?.password}
        style={{
          ...styles.input,
          ...(errors && !loginData?.password ? styles.errorBorder : {}),
          }}
      />
      <button type="button" style={styles.button} onClick={(e)=>handleSubmit(e)}>Login</button>
      <div style={styles.signupdiv}>
        <div style={styles.text}>Not a Member ?</div>
        <div style={styles.signup} onClick={()=>navigateSignUp()}>Sign Up</div>
      </div>
    </form>
  </div>
  );
};

export default LoginForm;
