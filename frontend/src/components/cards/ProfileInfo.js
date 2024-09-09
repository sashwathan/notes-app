import React from 'react'
import { MdPerson4 } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ProfileInfo = ({ userInfo }) => {
    const navigate = useNavigate();

    const onLogout = () =>{
      localStorage.clear();
        navigate("/login");
    }

    if (!userInfo) {
      return null; // You could also render a loading state or a placeholder here
  }
  return (
    <div className='flex items-center gap-3'>

         <MdPerson4 size={35} className='border-[1.5px] border-solid bg-slate-200 rounded-2xl'/>
            <div>
                <p className='text-lg font-semibold text-slate-600 '>{userInfo.fullName}</p>
                <button className='text-lg text-slate-500 underline' onClick={onLogout}>
                    logout
                </button>
            </div>
        
      
    </div>
  )
}

export default ProfileInfo;