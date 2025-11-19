import express from 'express'
import { collectionName, connection } from './dbConfig.js'
import cors from 'cors'

const app = express()

// middlewars
app.use(express.json())
app.use(cors())


// add task api
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


// get api 
app.get("/tasks", async (req, resp) => {
   const db = await connection()
   const collection = await db.collection(collectionName);
   const result = await collection.find().toArray();
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


app.listen(3500)