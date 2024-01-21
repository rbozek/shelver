import { Router } from 'express'
import * as albumsCtrl from '../controllers/albums.js'

const router = Router()

// GET http://localhost:3000/flights
router.get('/', albumsCtrl.index)
// replaces: 
// router.get('/', function (req, res) {
//   res.render('albums/index', { title: 'Shelver - public shelf' })
// })

export {
  router
}