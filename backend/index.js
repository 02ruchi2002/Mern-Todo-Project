import express from 'express'
import { collectionName, connection } from './dbConfig.js'
import cors from 'cors'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()

// middlewars
app.use(express.json())
app.use(cors({
   origin:'http://localhost:5173',
   credentials:true
}))
app.use(cookieParser())

// signup api  
app.post('/signup', async (req, resp) => {
   const userData = req.body
   if (userData.email && userData.password) {
      const db = await connection()
      const collection = await db.collection('users')
      const result = await collection.insertOne(userData)
      if (result) {
         jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
            resp.send({
               success: true,
               mesg: "signup done",
               token
            })
         })
      }

   } else {
      resp.send({
         success: false,
         mesg: "signup not done",

      })
   }

})

//  login api
app.post('/login', async (req, resp) => {
   const userData = req.body
   if (userData.email && userData.password) {
      const db = await connection()
      const collection = await db.collection('users')
      const result = await collection.findOne({ email: userData.email, password: userData.password })
      if (result) {
         jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
            resp.send({
               success: true,
               mesg: "login done",
               token
            })
         })
      } else {
         resp.send({
            success: false,
            mesg: "user not found",

         })
      }

   } else {
      resp.send({
         success: false,
         mesg: "login not done",

      })
   }

})

// add/save task api
app.post("/add-task", async (req, resp) => {
   const db = await connection()
   const collection = await db.collection(collectionName);
   const result = await collection.insertOne(req.body);
   if (result) {
      resp.send({
         message: "new task added",
         success: true,
         result: result
      })
   } else {
      resp.send({
         message: "task not added",
         success: false,

      })
   }
})



// get api to get task list 
app.get('/tasks',verifyJWTtoken, async (req, resp) => {
   const db = await connection()
   const collection = await db.collection(collectionName);
   const result = await collection.find().toArray();
   console.log(req.cookies)
   if (result) {
      resp.send({
         message: " task fetched",
         success: true,
         result: result
      })
   } else {
      resp.send({
         message: "task not fetched",
         success: false,

      })
   }
})

// middleware function to verify JWT token
function verifyJWTtoken (req,resp,next) {
  const token = req.cookies['token']
  
  jwt.verify(token,'Google',(error,decoded)=>{
     if(error){
      return resp.send({
         mesg:"invalid token",
         success:false
      })
     }
     next()
  })
}


//delete api to delete todo 
app.delete('/delete/:id', async (req, resp) => {
   const id = req.params.id
   const db = await connection()
   const collection = await db.collection(collectionName);
   const result = await collection.deleteOne({ _id: new ObjectId(id) })
   if (result) {
      resp.send({
         message: " task deleted",
         success: true,
         result: result
      })
   } else {
      resp.send({
         message: "error try after sometime",
         success: false,

      })
   }
})



// get api to get the task to populate data on form before update
app.get('/task/:id', async (req, resp) => {
   const id = req.params.id
   const db = await connection()
   const collection = await db.collection(collectionName)
   const result = await collection.findOne({ _id: new ObjectId(id) })
   console.log(result)
   if (result) {
      resp.send({
         message: " task fetched",
         success: true,
         result: result
      })
   } else {
      resp.send({
         message: "task not fetched",
         success: false,

      })
   }
})



// get api to populate data on form before update
app.put('/update-task/:id', async (req, resp) => {
   const db = await connection()
   const collection = await db.collection(collectionName)
   const { _id, ...fields } = req.body
   const update = { $set: fields }
   const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)
   if (result) {
      resp.send({
         message: " task updated",
         success: true,
         result: result
      })
   } else {
      resp.send({
         message: "task not updated",
         success: false,

      })
   }
})

//delete api to delete todo 
app.delete('/delete-multiple', async (req, resp) => {
   const db = await connection()
   const collection = await db.collection(collectionName);

   const Ids = req.body
   const deleteTaskIds = Ids.map((item) => new ObjectId(item))
   const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } })
   if (result) {
      resp.send({
         message: " task deleted",
         success: true,

      })
   } else {
      resp.send({
         message: "error try after sometime",
         success: false,

      })
   }
})



app.listen(3500)