import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

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
  recordLabel: {type: String},
  // reviews: [reviewSchema],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{ 
  timestamps: true
})

const Album = mongoose.model('Album', albumSchema)

export {
  Album
}