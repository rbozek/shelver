import { Router } from 'express'
import * as albumsCtrl from '../controllers/albums.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

//list in order of MOST to LEAST specific

// SHOW MAIN PUBLIC SHELF - GET http://localhost:3000/albums
router.get('/', albumsCtrl.index)

// SHOW 'ADD ALBUM' VIEW - GET http://localhost:3000/albums/new
router.get('/new', isLoggedIn, albumsCtrl.new)

// CREATE NEW ALBUM - POST http://localhost:3000/albums/
router.post('/', isLoggedIn, albumsCtrl.create)

// SHOW 'MY SHELF' VIEW - GET http://localhost:3000/albums/my-shelf/:profileId
router.get('/myShelf/:profileId', isLoggedIn, albumsCtrl.myShelf)

// SHOW 'ALBUM DETAIL' VIEW - GET http://localhost:3000/albums/show
router.get('/:albumId', albumsCtrl.show)

// ADD ALBUM TO MY SHELF/ PROFILE MODEL - POST 3000/albums/:albumId/
router.post('/:albumId/addToMyShelf', isLoggedIn, albumsCtrl.addToMyShelf)

// REMOVE ALBUM FROM MY SHELF/ PROFILE MODEL - DEL 3000/albums/:albumId/
router.delete('/:albumId/removeFromMyShelf', isLoggedIn, albumsCtrl.removeFromMyShelf)

// SHOW 'ALBUM EDIT' VIEW - GET http://localhost:3000/albums/:albumid/edit
router.get('/:albumId/edit', isLoggedIn, albumsCtrl.edit)

// ADD REVIEW FROM 'ALBUM DETAIL' VIEW - GET http://localhost:3000/albums/:albumid/edit
router.post('/:albumId/reviews', isLoggedIn, albumsCtrl.addComment)

// UPDATE ALBUM DETAILS ON EDIT VIEW - GET http://localhost:3000/albums/:albumid
router.put('/:albumId', isLoggedIn, albumsCtrl.update)

// DELETE ALBUM FROM 'ALBUM EDIT' VIEW - DEL http://localhost:3000/albums/:albumId
router.delete('/:albumId', isLoggedIn, albumsCtrl.delete)

// better/clearer error display page - incorporate next - GET http://localhost:3000/albums/error 
// router.get('/error', function(req, res) {
//   res.render('albums/error', { title: 'Error page' })
// })

export {
  router
}