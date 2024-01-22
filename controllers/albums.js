// IMPORT MODEL UP HERE EVENTUALLY

function index(req, res) {
  res.render('albums/index', {
    title: 'Public Shelf'
  })
}

function newAlbum(req, res) {
  res.render('albums/new', {
    title: 'Add Album'
  })
}

export {
  index,
  newAlbum as new
}