import express from "express";
import jwt from "jsonwebtoken";
import {UserSchema,SigninSchema,CreateRoom} from "@repo/common/types";
import {prismaClient }from "@repo/db/client"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";

const app=express();
app.use(express.json());
const port=3012;
app.post("/signup",async (req,res)=>{
    const parsedata=UserSchema.safeParse(req.body);
    
    if(!parsedata.success){
        console.log(parsedata.data);
        
        res.json({
            "message":"Incorrect Input"
        })
        return ;

    }
    try{
       const userData= await prismaClient.user.create({
            data:{
                email:parsedata.data.username,
                password:parsedata.data.password,
                name:parsedata.data.name
            }
        })
        res.json({
                UserId:userData.id
        })

    }catch(e){
        res.status(411).json({
            "message":"Incorrect Data or user exist already"
        })
    }


})

app.post("/signin",async(req,res)=>{
    const parsedata=SigninSchema.safeParse(req.body);
    if(!parsedata.success){
        res.json({
            "message":"Incorrect Input"
        })  
        return ;

    }

    const userData=await prismaClient.user.findFirst({
        where:{
            email:parsedata.data.username,
            password:parsedata.data.password
        }
    })

    if(!userData){
        res.status(411).json({
            message:"UnAuthorised"
        })
        return ;
    }

    const token=jwt.sign({
        userId:userData?.id
    },JWT_SECRET);

    res.json({
        token
    })


})

app.post("/room",middleware,async(req,res)=>{
    const parsedata=CreateRoom.safeParse(req.body);
    if(!parsedata.success){
        res.json({
            "message":"Incorrect Input"
        })
        return ;

    }
    //@ts-ignore
    const userId=req.userId;
    const roomName=await prismaClient.room.create({
            data:{
                slug:parsedata.data.name,
                adminId:userId
        }
    })
    res.json({
        "room":roomName.id
    })
    
})

app.get("/chat/:roomId",async (req,res)=>{
    const roomId=Number(req.params.roomId);
   const message= await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id:"desc",
        },
        take:20
    });
    res.json({
        message
    })
})

app.get("/room/:slug",async (req,res)=>{
    const slug=req.params.slug;
   const room= await prismaClient.room.findFirst({
        where:{
            slug
        },

    });
    res.json({
        room
    })
})


app.listen(port,()=>{
    console.log(`this is listening at ${port}`);
    
})