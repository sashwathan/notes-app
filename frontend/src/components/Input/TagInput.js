import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({tags, setTags}) => {
    const [inputValue, setInputValue] = useState("");

    const HandleInputChange = (e) =>{
        setInputValue(e.target.value);
    }
    const addNewTag = () =>{
        if(inputValue.trim()!== ""){
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) =>{
        if(e.key === "enter"){
            addNewTag();
        }
    }

    const handleRemoveTag = (tagToRemove) =>{
        setTags(tags.filter((tag)=> tag !== tagToRemove));
    };
  return (
    <div>
        {tags?.length > 0 && (
            <div className='flex items-center gap-2 flex-wrap mt-2'>
                {tags.map((tag, index)=>(
                    <span key={index} className='flex gap-1 text-slate-500 font-medium border rounded-md'>
                        #{tag}
                        <button onClick={()=>{handleRemoveTag(tag)}}>
                            <MdClose className='hover:text-black'/>
                        </button>
                    </span>
                )
                )}
            </div> 
        ) }
        <div className='flex items-center gap-4 mt-3'>
            <input type='text' value={inputValue} placeholder='add tags' className='text-md bg-transparent border px-3 py-2 rounded-md outline-blue-500'
            onChange={HandleInputChange}/>
            <MdAdd size={30} className='cursor-pointer border rounded-md bg-blue-500 text-medium text-white'
            onClick={()=> {addNewTag();}}
            onKeyDown={handleKeyDown}/>
        </div>
    </div>
  )
}

export default TagInput;