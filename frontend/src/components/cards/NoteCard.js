import React from 'react'
import { MdCreate, MdDelete, MdOutlinePushPin } from 'react-icons/md';

const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    handleEdit,
    onDelete,
    OnPinNote
}) => {
  return (
    <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
       <div className='flex items-center justify-between'>
        <div>
            <h6 className='text-lg font-medium'>{title}</h6>
            <span className='text-xs text-slate-500'>{date}</span>
        </div>
        <MdOutlinePushPin
  size={25}
  className={`icon-btn ${isPinned ? 'text-blue-700' : 'text-slate-700'} cursor-pointer`}
  onClick={OnPinNote}
/>
       </div>
       <p className='mt-2 text-md text-slate-600'>{content?.slice(0,60)}</p>
       <div className='flex justify-between'>
        <div className=' flex items-center mt-2'>
          <div className='text-slate-600 text-xs '> {tags.map((item)=>`#${item} `)} </div>
          
          </div>
        <div className='flex items-center gap-2'>
        <MdCreate size={20} className=' icon-btn hover:text-green-600 text-slate-500'
        onClick={handleEdit}/>
        <MdDelete size={20} className=' icon-btn hover:text-red-600 text-slate-500'
        onClick={onDelete}/>
        </div>
       </div>
    </div>
  )
}

export default NoteCard;