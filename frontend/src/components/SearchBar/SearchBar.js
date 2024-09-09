import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({value, onChange, HandleSearch, OnClearSearch}) => {

  return (
    <div className='flex w-80 items-center px-4 bg-slate-100 rounded-md'>
        <input type='text' placeholder='search notes' value={value} onChange={onChange} className=' w-full text-md bg-transparent py-[11px] outline-none'/>
       
       {value && (       
         <IoMdClose size={25} onClick={OnClearSearch} className='text-slate-400 hover:text-black cursor-pointer mr-2'/> 
         )}
       
       
        <FaMagnifyingGlass size={21} onClick={HandleSearch} className='text-slate-400 hover:text-black cursor-pointer'/>
        
    </div>
  )
}

export default SearchBar;