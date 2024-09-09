import React, { useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, HandleClearSearch }) => {
    const[searchQuery, setSearchQuery] = useState("");

    const HandleSearch = () => {
      if(searchQuery){
        onSearchNote(searchQuery);
      }
    };

    const OnClearSearch = ()=>{
        setSearchQuery("");
        HandleClearSearch();        
    }

  return (
    <div className='bg-white flex items-center py-2 justify-between px-6 drop-shadow'>
        <h2 className='text-2xl font-semibold text-black py-2'>
            Notes
        </h2>
        <SearchBar value={searchQuery} 
        onChange={({target})=>{setSearchQuery(target.value)}}
        OnClearSearch={OnClearSearch}
        HandleSearch={HandleSearch}/>
        <ProfileInfo userInfo={userInfo}/>
    </div>
  )
}

export default Navbar;