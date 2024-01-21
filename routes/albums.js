import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('albums/index', { title: 'Shelver - public shelf' })
})

export {
  router
}