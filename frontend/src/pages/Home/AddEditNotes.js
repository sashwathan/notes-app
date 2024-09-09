import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

const AddEditNotes = ({ noteData, type,  getAllNotes, onClose, }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags,
            });
            
            if (response.data && response.data.note) {
                // showToastMessage("Note added successfully", "add");
                getAllNotes();
                onClose(); 
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            });
            
            if (response.data && response.data.note) {
                // showToastMessage("Note edited successfully", "edit");
                getAllNotes();
                onClose();  // Fix: Call onClose() with a capital C
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNotes = async (e) => {
        e.preventDefault();
        if (!title) {
            setError("Please enter the title.");
            return;
        }
        if (!content) {
            setError("Please enter the content.");
            return;
        }
        setError("");
        if (type === 'edit') {
            editNote();
        } else {
            addNewNote();
        }
    }

    return (
        <div className='relative'>
            <button onClick={onClose} className='flex w-10 h-10 rounded-full items-center justify-center absolute right-0'>
                <MdClose size={25} className='text-slate-500 hover:text-black'/>
            </button>
            <form className='flex flex-col gap-2'>
                <label className='text-slate-500 text-lg underline'>Title</label>
                <input
                    type='text'
                    className='text-slate-500 text-md border-[1px] rounded-md outline-none'
                    placeholder='Enter title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <label className='text-slate-500 text-lg underline'>Enter Content</label>
                <textarea
                    type='text'
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                    className='text-slate-500 text-md border-[1px] rounded-md outline-none'
                    placeholder='Enter content'
                    rows={10}
                />
                <label className='text-slate-500 text-lg underline'>Tags:</label>
                <TagInput tags={tags} setTags={setTags} />
                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
                <button className='btn-primary font-medium w-40 h-10' onClick={handleAddNotes}>
                    {type === 'edit' ? 'UPDATE' : 'ADD'}
                </button>
            </form>
        </div>
    )
}

export default AddEditNotes;