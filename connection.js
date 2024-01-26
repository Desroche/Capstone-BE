require("dotenv").config();
const mongoose = require('mongoose');
const databasePass = process.env.DB_PASSWORD;


const uri = `mongodb+srv://Lucas123:${databasePass}@cluster0.bjicnwj.mongodb.net/project-users?retryWrites=true&w=majority`;


let isConnected = false;

const connectToDB = async() => {

  if(isConnected){
    console.log("Mongo already connected")
    return
  }

  try { 
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    isConnected = true
    console.log("Database connected")   
    }

    catch(e){
      console.log(e)
    }
  }

module.exports = connectToDB;
