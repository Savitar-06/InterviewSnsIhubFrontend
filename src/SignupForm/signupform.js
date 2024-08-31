import React, { useEffect, useState } from 'react';
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
    select: {
        marginBottom: '15px',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        background:'none',
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
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    login: {
        color: '#007bff',
        marginTop: '20px',
        textAlign: 'center',
        cursor: 'pointer',
    },
    text: {
        marginTop: '20px',
        textAlign: 'center',
        marginRight:"4px"
    },
    logindiv: {
        display: 'flex',
        justifyContent: 'center',
    },
    errorBorder: {
        borderBottom: '2px solid red',
    },
};

const SignupForm = () => {
 
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: '',
    password: '',
  });
  const [roles, setroles] = useState();


  useEffect(()=>{
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/usersroles');
          setroles(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
  },[])

  const [errors, setErrors] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
        console.log(formData)
        if(formData.email !=="" && formData.firstName !=="" && formData.mobile !=="" 
            && formData.password!=="" && formData.role !==""){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(formData?.email)){
                setErrors(true);
                alert("Please enter a valid email [eg: abc@gmail.com]")
                return;
            }
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log(response.data);
            if(response.data.error===false){
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    role: '',
                    password: '',
                  })
                setErrors(false)
                alert("User Registerd Successfully")
                navigate(AppRoutes.login);
            } else {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    role: '',
                    password: '',
                  })
                alert("Failed to Register")
            }
        } else {
            setErrors(true)
        }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const navigateLoginFormUp = ()=>{
    navigate(AppRoutes.login);
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.title}>Signup</div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e)=>handleChange(e)}
          required
          value={formData?.firstName}
          style={{
          ...styles.input,
          ...(errors && !formData?.firstName ? styles.errorBorder : {}),
          }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e)=>handleChange(e)}
          value={formData?.lastName}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          onChange={(e)=>handleChange(e)}
          required
          value={formData?.email}
          style={{
          ...styles.input,
          ...(errors && !formData?.email ? styles.errorBorder : {}),
          }}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile No"
          onChange={(e)=>handleChange(e)}
          required
          value={formData?.mobile}
          style={{
          ...styles.input,
          ...(errors && !formData?.mobile ? styles.errorBorder : {}),
          }}
        />
        <select name="role" onChange={(e)=>handleChange(e)}    
        style={{
          ...styles.input,
          ...(errors && !formData?.role ? styles.errorBorder : {}),
          }} 
        value={formData?.role}>
          <option value="" defaultChecked>
            Select Role
          </option>
          {roles?.map((v,i)=>{
            return <option key={i} value={v?.id}>{v?.value}</option>
          })}
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e)=>handleChange(e)}
          required
          value={formData?.password}
          style={{
          ...styles.input,
          ...(errors && !formData?.password ? styles.errorBorder : {}),
          }}
        />
        <button type="button" onClick={(e)=>handleSubmit(e)} style={styles.button}>Signup</button>
        <div style={styles.logindiv}>
            <div style={styles.text}>Already a Member ?</div>
            <div style={styles.login} onClick={()=>navigateLoginFormUp()}>Login</div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
