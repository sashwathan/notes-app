import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';

const SignUp = () => {
  const[name, setName]= useState("");
  const[email, setEmail]= useState("");
  const[password, setPassword] = useState("");
  const[error, setError]= useState(null);
  const navigate = useNavigate();

  const HandleSignUp = async (e) =>{
    e.preventDefault();

    if (!name){
      setError("didnt yo mama give u a name?!");
      return;
    }
    if(!password){
      setError("whose gonna give the password?");
      return;
    }
    if(!validateEmail(email)){
      setError("even kids has email id !");
      return;
    }
    setError("")

    try{
      const response = await axiosInstance.post("/create-account",{
        fullName: name,
        email:email,
        password: password,
      });

      
      if(response.data && response.data.accessToken){
       setError(response.data.message);
       return;
      }

      if(response.data && response.data.accessToken){
        navigate('/login');
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
          <form >
            <h4 className='text-2xl mb-7'>SignUp</h4>
            <input type='text' placeholder='enter your name' className='input-box'
            value={name}
            onChange={(e)=> setName(e.target.value)}/>
            <input type='text' placeholder='enter your email' className='input-box'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
            <PasswordInput placeholder={"enter new pass"}
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            
           {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary' onSubmit={HandleSignUp}>Sign up</button>
            <Link to="/login" className='text-sm underline text-primary justify-center'>
                already a user, then login?
              </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;