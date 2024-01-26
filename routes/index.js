import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  res.render('index', { title: 'Shelver' })
})

router.get('/about', function (req, res) {
  res.render('about', { title: 'About' })
})

router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Contact' })
})

export {
  router
}