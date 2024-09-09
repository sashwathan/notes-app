import React from 'react'
import add from './add-post.png';
import { RiStickyNoteAddLine } from "react-icons/ri";

const EmptyCard = () => {
  return (
    <div className='flex flex-col items-center justify mt-20'>
        <RiStickyNoteAddLine size={100} className='text-blue-600'/>
        {/* <img src={add} className='w-40 size-90' /> */}
        <p className='w-1/2 text-xl font-medium text-slate-700 text-center leading-7 mt-5'>
        No notes added, to add a note click on the <span className='text-blue-600'>'+'</span> icon. 
        </p>  
    </div>
  )
}

export default EmptyCard;