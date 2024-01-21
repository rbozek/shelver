// IMPORT MODEL UP HERE EVENTUALLY

function index(req, res) {
  res.render('albums/index', {
    title: 'Shelver - public shelf'
  })
}

export {
  index
}