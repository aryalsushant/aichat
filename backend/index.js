import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js" 
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json())

//either this
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  };

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});



app.get("/api/upload",(req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send("it works!");
})

app.get("/api/test", ClerkExpressRequireAuth(), (req, res) =>{
  console.log("Success")
  res.send("Success!")
})

app.post("/api/chats",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    const {userId, text} = req.body


    try{

      //Creating a new chat

      const newChat = new Chat({
        userId: userId, 
        history:[{role:"user", parts:[{text}]}]
      });

      const savedChat = await newChat.save();

      //Checking if the userchat exists
      const userChats = await UserChats.find({userId:userId});
      //if it doesn't, we create a new one
      if(!userChats.length){
        const newUserChats = new UserChats({
          userId:userId,
          chats: [
            {
              _id:savedChat.id,
              title: text.substring(0,40),

              
            }
          ]
        });
        await newUserChats.save();
      }else {
        //if it exists, we push it to existing array
        await UserChats.updateOne({userId:userId}, {
          $push: {
            chats: {
              _id:savedChat._id,
              title: text.substring(0,40),
            }
          }
        })
      }

    }catch(err){
      console.log(err)
      res.status(500).send("Error creating chat!")
    }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
    connect();
    console.log("Server running on 3000");
  });

  //or this chunk needs work