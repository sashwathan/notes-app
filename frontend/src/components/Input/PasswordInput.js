import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
const PasswordInput = ({value, onChange, placeholder}) => {
    const[isShowpassword, setIsShowPassword] = useState(false);

    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowpassword);
    }
  return (
    <div className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none'>
        <input value={value} onChange={onChange} type={isShowpassword ? 'text' : 'password'} 
        placeholder={placeholder || 'password'}
        className='bg-transparent outline-none'/>
        {isShowpassword ? (
            <FaRegEye size={18}
            className="text-primary
            cursor-pointer
            flex"
            onClick={()=> toggleShowPassword()} />
        ) : (
            <FaRegEyeSlash size={18} className='text-slate-400 cursor-pointer'
            onClick={()=> !toggleShowPassword()}/>
        )}
    </div>
  )
}
 
export default PasswordInput