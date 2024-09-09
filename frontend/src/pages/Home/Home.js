import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import moment from 'moment';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';

const Home = () => {
  const [openAddEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const[isSearch , setIsSearch] = useState(false);

  const onSearchNote = async (query) =>{
    try{
      const response = await axiosInstance.get("/search-notes",
        {
          params:{ query },  
        }
      );
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes)
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const showToastMesage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const newPinnedState = !noteData.isPinned; // Toggle the pin state
  
    try {
      const response = await axiosInstance.put(`/is-pinned/${noteId}`, {
        isPinned: newPinnedState,  // Send the toggled state to the server
      });
  
      if (response.data && response.data.note) {
        // Set the new state by mapping over the notes and updating the note that was pinned/unpinned
        setAllNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, isPinned: newPinnedState } : note
          )
        );
      } else {
        console.log("Error: Response does not contain the updated note.");
      }
    } catch (error) {
      console.log("Error updating pin state:", error); // Debugging: log the error
    }
  };
  



  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserinfo] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenEditModal({
      isShown: true,
      data: noteDetails,
      type: "edit",
    });
  };

  const getUserinfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserinfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("unexpected error");
    }
  };

  const HandleClearSearch = ()=>{
    setIsSearch(false);
    getAllNotes();
  }

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-notes/" + noteId);
      if (response.data && !response.data.error) {
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("unexpected error");
      }
    }
  };

  useEffect(() => {
    getAllNotes();
    getUserinfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} HandleClearSearch={HandleClearSearch}/>
      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-5 ml-5 mr-5">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format('DD-MMM-YYYY')}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                handleEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                OnPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button
        className="bg-primary w-16 h-16 items-center justify-center flex rounded-2xl hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd size={40} className="text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] border max-h-3/4 rounded-md bg-white mx-auto mt-14 p-5"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>

      {/* <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      /> */}
    </>
  );
};

export default Home;
