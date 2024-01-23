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
    res.redirect('/')
  })
}

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Add Album'
  })
}

function myShelf(req, res) {
  res.render('albums/my-shelf', {
    title: 'My Shelf'
  })
}

function show(req, res){
  // console.log('show function test');
  Album.findById(req.params.albumId)
  // to populate full info of album owner's profile
  .populate("owner")
  .then(album => {
    res.render('albums/show', {
      album,
      title: 'Album Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  console.log('show edit page test');
  Album.findById(req.params.albumId)
  .then(album => {
    res.render('albums/edit', {
      album,
      title: 'Edit Album Details'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  // console.log('create function first test');
  
  req.body.owner = req.user.profile._id
  Album.create(req.body)
  .then(album => {
    // console.log('create function 2nd test');
    res.redirect('/albums')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  console.log("testing update album!")
  // below lines not necessary - for removing empty properties - temp keep for reference.
  // for (let key in req.body) {
  //   if(req.body[key] === "") delete req.body[key]
  // }


  Album.findByIdAndUpdate(req.params.albumId, req.body, {new: true})
  .then(album => {
    res.redirect(`/albums/${album._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

// now fully protected. find album by id, then IF the owner id matches profile id, will go ahead.
function deleteAlbum(req, res) {
  Album.findById(req.params.albumId)
  .then(album => {
    if (album.owner.equals(req.user.profile._id)) {
      taco.deleteOne()
      .then(() => {
        res.redirect("/albums")
      })
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    } 
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

export {
  index,
  newAlbum as new,
  myShelf,
  show,
  edit,
  create,
  update,
  deleteAlbum as delete
}