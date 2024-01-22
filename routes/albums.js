import { Router } from 'express'
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

// display main public shelf - GET http://localhost:3000/albums
router.get('/', albumsCtrl.index)

// display new album page - GET http://localhost:3000/albums/new
router.get('/new', albumsCtrl.new)
// create new album - POST http://localhost:3000/albums/
router.post('/', albumsCtrl.create)

// display my collection page - GET http://localhost:3000/albums/collection
router.get('/my-shelf', albumsCtrl.myShelf)




export {
  router
}