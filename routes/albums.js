import { Router } from 'express'
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

// SHOW MAIN PUBLIC SHELF - GET http://localhost:3000/albums
router.get('/', albumsCtrl.index)
// SHOW 'ADD ALBUM' PAGE - GET http://localhost:3000/albums/new
router.get('/new', albumsCtrl.new)
// CREATE NEW ALBUM - POST http://localhost:3000/albums/
router.post('/', albumsCtrl.create)
// SHOW MY SHELF PAGE - GET http://localhost:3000/albums/collection
router.get('/my-shelf', albumsCtrl.myShelf)
// SHOW ALBUM DETAIL PAGE - GET http://localhost:3000/albums/show
router.get('/:albumId', albumsCtrl.show)
// SHOW ALBUM EDIT VIEW - GET http://localhost:3000/albums/show
router.get('/:albumId/edit', albumsCtrl.edit)



// display error page? - GET http://localhost:3000/albums/error
// router.get('/error', function(req, res) {
//   res.render('albums/error', { title: 'Error page' })
// })


export {
  router
}