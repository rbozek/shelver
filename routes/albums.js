import { Router } from 'express'
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

// display main public shelf - GET http://localhost:3000/albums
router.get('/', albumsCtrl.index)
// display new album page - GET http://localhost:3000/albums/new
router.get('/new', albumsCtrl.new)
// display my collection page - GET http://localhost:3000/albums/collection
router.get('/my-shelf', albumsCtrl.myShelf)
// display album detail page - GET http://localhost:3000/albums/show
router.get('/:albumId', albumsCtrl.show)

// create new album - POST http://localhost:3000/albums/
router.post('/', albumsCtrl.create)


// display error page? - GET http://localhost:3000/albums/error
// router.get('/error', function(req, res) {
//   res.render('albums/error', { title: 'Error page' })
// })


export {
  router
}