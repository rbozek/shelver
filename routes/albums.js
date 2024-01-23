import { Router } from 'express'
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

//list in order of MOST to LEAST specific

// SHOW MAIN PUBLIC SHELF - GET http://localhost:3000/albums
router.get('/', albumsCtrl.index)
// SHOW 'ADD ALBUM' PAGE - GET http://localhost:3000/albums/new
router.get('/new', albumsCtrl.new)
// CREATE NEW ALBUM - POST http://localhost:3000/albums/
router.post('/', albumsCtrl.create)
// SHOW 'MY SHELF' PAGE - GET http://localhost:3000/albums/my-shelf
router.get('/my-shelf', albumsCtrl.myShelf)
// SHOW 'ALBUM EDIT' PAGE - GET http://localhost:3000/albums/:albumid/edit
router.get('/:albumId/edit', albumsCtrl.edit)
// SHOW 'ALBUM DETAIL' PAGE - GET http://localhost:3000/albums/show
router.get('/:albumId', albumsCtrl.show)
// UPDATE ALBUM DETAILS ON EDIT PAGE - GET http://localhost:3000/albums/:albumid
router.put('/:albumId', albumsCtrl.update)
// DELETE ALBUM FROM 'ALBUM EDIT' PAE - DEL http://localhost:3000/albums/:albumId
router.delete('/:albumId', albumsCtrl.delete)



// display error page? - GET http://localhost:3000/albums/error
// router.get('/error', function(req, res) {
//   res.render('albums/error', { title: 'Error page' })
// })


export {
  router
}