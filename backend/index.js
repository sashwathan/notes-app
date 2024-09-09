require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require("./models/user");
const Note = require("./models/note");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notesapp')
  .then(() => console.log('Connected to MongoDB'));


  app.get("/", (req,res) =>{
    res.json({data : "hello"});
  });

  app.post("/create-account", async (req,res) =>{
    const {fullName, email , password} =req.body;

    if(!fullName){
        return res
        .status(400)
        .json({ error: true, message: "Full Name is required"});
    }
    if(!email){
        return res
        .status(400)
        .json({ error: true, message:"Email required!"});

    }
    if(!password){
        return res
        .status(400)
        .json({ error: true, message:"Password required!"});
        
    }

    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({
            error: true,
            message:"user already exists"
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "36000m",
    })

    return res.json({
        error: false,
        user,
        accessToken,
        message:"reg successful",
    })

  });

  app.post("/login", async (req,res) =>{
    const {email , password} =req.body;
    if(!email){
        return res
        .status(400)
        .json({ error: true, message:"Email required!"});
    }
    if(!password){
        return res
        .status(400)
        .json({ error: true, message:"Password required!"});   
    }

    const userInfo = await User.findOne({ email: email});

    if(!userInfo){
        return res
        .status(400)
        .json({error: true, message:"user does not exist"});
    }

    if(userInfo.email == email && userInfo.password == password){
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "3600m",
        });
        return res.json({
            error: false,
            message:"login successs",
            email,
            accessToken,
        });
    } 
    else{
        return res.status(400).json({
            error: true,
            message:"Invalid credentials",
        });
    }
  });

  app.get("/get-user", authenticateToken, async(req,res)=>{
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id })

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: {fullName:isUser.fullName, email:isUser.email, "_id":isUser._id, createdOn: isUser.createdOn,},
        message: "user logged in!"
        
    })
  }
)


  app.post("/add-note", authenticateToken, async (req,res)=>{
    const { title, content, tags } = req.body;
    const { user } = req.user;


    if(!title){
        return res
        .status(400)
        .json({error: true, message:"enter title"});
    }
    if(!content){
        return res
        .status(400)
        .json({error: true, message:"enter content"});
    }

    try{
        const note = new Note({
            title, 
            content,
            tags: tags || [],
            userId: user._id,
        });
        await note.save();

        return res.json({
            error: false,
            note,
            message:"note added sucessfully",           
        })
    } catch (error) {
        return res .status(500) .json({
            error: true,
            message:"internal error",
        });
    }

  });

  app.put("/edit-note/:noteId", authenticateToken, async (req,res)=>{
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned} = req.body;
    const { user } = req.user;

    if(!title && !content && !tags){
        return res
        .status(400)
        .json({
            error:true,
            message:"no changes provided"
        });
    }

    try{
        const note = await Note.findOne({ _id: noteId, userId: user._id});

        if(!note){
            return res
            .status(404) 
            .json({
                error: true,
                message:"note not found",
            });
        }
        if(title) note.title= title;
        if(content) note.content = content;
        if(tags) note.tags= tags;
        if (isPinned) note.isPinned= isPinned;

        await note.save();

        return res.json({
            error:false,
            note,
            message:"note updated!",
        });
    }
    catch(error){
        return res
        .status(500)
        .json({
            error:true,
            message: "internal server error"
        });
    }
  });

  app.get("/get-notes", authenticateToken, async( req, res)=>{
    const { user } = req.user;

    try{
        const notes = await Note.find({userId: user._id}).sort({isPinned: -1});
        return res.json({
            error:false,
            notes,
            message:"all notes retrived"
        })
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:"internal server error",
        });
    }

  } )

  app.delete("/delete-notes/:noteId", authenticateToken, async( req, res)=>{
    const noteId = req.params.noteId;
    const { user } = req.user;

    try{
        const note = await Note.findOne({_id: noteId, userId: user._id});
        if(!note){
        return res.json({
            error:true,
            message:"note not found"
        })}
        await Note.deleteOne({_id: noteId, userId: user._id});
        return res.json({
            error:false,
            message:"note deleted succesfully",
        });
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:"internal server error",
        });
    }
  })
  
//   app.put("/is-pinned/:noteId", authenticateToken, async (req,res)=>{
//     const noteId = req.params.noteId;
//     const { isPinned} = req.body;
//     const { user } = req.user;

//     try{
//         const note = await Note.findOne({ _id: noteId, userId: user._id});

//         if(!note){
//             return res
//             .status(404) 
//             .json({
//                 error: true,
//                 message:"note not found",
//             });
//         }
//         note.isPinned= isPinned;

//         await note.save();

//         return res.json({
//             error:false,
//             note,
//             message:"note pinned!",
//         });
//     }
//     catch(error){
//         return res
//         .status(500)
//         .json({
//             error:true,
//             message: "internal server error"
//         });
//     }
//   });

app.put("/is-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;
  
    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });
  
      if (!note) {
        return res.status(404).json({
          error: true,
          message: "note not found",
        });
      }
  
      note.isPinned = isPinned;
      await note.save();
  
    //   console.log(`Note with ID ${noteId} is now pinned: ${isPinned}`); // Log the pin state for debugging
  
      return res.json({
        error: false,
        note,
        message: "Note pin state updated!",
      });
    } catch (error) {
      console.error("Error updating pin state:", error);
      return res.status(500).json({
        error: true,
        message: "internal server error",
      });
    }
  });
  
  app.get("/search-notes/", authenticateToken, async (req,res)=>{
    const { user } = req.user;
    const { query } = req.query;

    if(!query){
        return res
        .status(400)
        .json({error: true, message:"search query required!"});
    }
    try{
        const matchingNotes= await Note.find({
            userId: user._id,
            $or: [
                {title:{ $regex: new RegExp(query, "i")}},
                {content:{ $regex: new RegExp(query, "i")}},
            ],
        });
        return res.json({
            error:false,
            notes: matchingNotes,
            message:"Notes found"
        })
    }catch(error){
        return res.status(500) .json({
            error: true,
            message: "internal server error"
        })
    }
  });

  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  }); 