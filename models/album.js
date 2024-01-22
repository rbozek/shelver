import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const albumSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  releaseYear: {type: Number},
  recordLabel: {type: String}
},{ 
  timestamps: true
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}