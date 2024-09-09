import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

const Login = () => {
  const[email, setEmail] = useState("");
  const[password , setPassword] = useState("");
  const[error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleLogin = async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("please check yo bitch ass !");
      return;
    }
    if(!password){
        setError("please enter the password");
        return;
    }

    setError("")

    try{
      const response = await axiosInstance.post("/login",{
        email:email,
        password: password,
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/dashboard')
      }
    }
    catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("an unexpected error occured")
      }
    }


  }
  return (
    <div>
      <Navbar/>

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded-lg bg-white px-7 py-10'>
          <form onSubmit={HandleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type='text' placeholder='enter your email' className='input-box'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
            <PasswordInput 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>Login</button>

            <p className='text-sm text-center mt-4'>
              Are you new here,
              <Link to="/SignUp" className='font-medium underline text-primary'>
                Create an account ?
              </Link>

            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;