import { Album } from "../models/album.js"
import { Profile } from "../models/profile.js"

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
    title: 'Add Album to Public Shelf'
  })
}

function myShelf(req, res) {
  Profile.findById(req.params.profileId)
  .populate("myShelf")
  .then(profile => {
    res.render('albums/my-shelf', {
      albums: profile.myShelf,
      title: 'My Shelf'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res){
  Album.findById(req.params.albumId)
  // to populate data of album properties
  .populate([
    {path: "owner"},
    // 'deep population' to access author name in embedded reviewSchema
    {path: "reviews.author"}
  ])
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
  req.body.owner = req.user.profile._id
  Album.create(req.body)
  .then(album => {
    res.redirect(`/albums/${album._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  // below lines (for removing empty properties) not necessary as function is now - soon making Album model more complicated - keep for possible future use
  // for (let key in req.body) {
  //   if(req.body[key] === "") delete req.body[key]
  // }
  Album.findById(req.params.albumId)
  .then(album => {
    if (req.user) {
      album.updateOne(req.body)
      .then(() => {
        res.redirect(`/albums/${album._id}`)
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

function deleteAlbum(req, res) {
  // function auth-protected - find album by id, then IF the owner id matches profile id, will go ahead.
  Album.findById(req.params.albumId)
  .then(album => {
    if (album.owner.equals(req.user.profile._id)) {
      album.deleteOne()
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

function addComment(req, res){
  //find album
  Album.findById(req.params.albumId)
  .then(album => {
    // set author to profile's id
    req.body.author = req.user.profile._id
    req.body.rating = req.body.rating
    // push form data into reviews array
    album.reviews.push(req.body)
    album.save()
    .then(()=> {
      res.redirect(`/albums/${album._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/albums')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function addToMyShelf(req, res){
  Profile.findById(req.user.profile._id)
  .then(profile => {
    if (req.user) {
      //check if albumId is already in MyShelf to avoid duplicates
      if (!profile.myShelf.includes(req.params.albumId)) {  
        profile.myShelf.push(req.params.albumId)
        profile.save()
        .then(() => {
          res.redirect(`/albums/${req.params.albumId}`)
        })
      } else {
        // Handle case where albumId is already in myShelf
        console.log("is already in the shelf");
        res.redirect(`/albums/${req.params.albumId}`);
      }
    } else {
      throw new Error ('🚫 Not authorized 🚫')
    } 
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function removeFromMyShelf(req,res){
  Profile.findById(req.user.profile._id)
  .populate("myShelf")
  .then(profile => {
    if (req.user) {
      profile.myShelf.pull(req.params.albumId)
      profile.save()
      .then(() => {
        res.render('albums/my-shelf', {
          albums: profile.myShelf,
          title: 'My Shelf'
        })
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
  deleteAlbum as delete,
  addComment,
  addToMyShelf,
  removeFromMyShelf
}