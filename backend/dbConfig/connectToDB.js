require('dotenv').config()


const mongoose = require('mongoose');

async function connectToDb () {
    await mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    console.log("Connected to DB")
}

module.exports = connectToDb;