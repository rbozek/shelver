import { Album } from "../models/album.js"

function index(req, res) {
  Album.find({})
  .then(albums => {
    res.render('albums/index', {
      albums,
      title: 'Public Shelf'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums/error')
  })
}

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Add Album'
  })
}

function create(req, res) {
  // console.log('create function first test');
  Album.create(req.body)
  .then(album => {
    // console.log('create function 2nd test');
    res.redirect('/albums')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/albums/error')
  })
}

function myShelf(req, res) {
  res.render('albums/my-shelf', {
    title: 'My Shelf'
  })
}

export {
  index,
  newAlbum as new,
  create,
  myShelf
}