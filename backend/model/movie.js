const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id:{type:Number, required: true,unique: true},
  title: { type: String, required: true },
  overview:{type: String, required: true},
  backdropPath:{ type: String, required: true, default:"/vfEG79SQIg3p6B8rBLVeIo2BBhb.jpg" },
  posterPath:{ type: String, required: true, default:"/xi2pblvQtCnh26SeOYzx1YX3DLT.jpg" },
  genres: {
    type: [{ type: String, required: true }]},
  date:{type:Date},    
  user:{type:mongoose.Schema.Types.ObjectId, ref:"User"}

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
