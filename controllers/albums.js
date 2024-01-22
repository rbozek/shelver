// IMPORT MODEL UP HERE EVENTUALLY

function index(req, res) {
  res.render('albums/index', {
    title: 'Public Shelf'
  })
}

export {
  index
}