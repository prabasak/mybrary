const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All authors
router.get('/', async (req, res) => {
  const searchOptions = {}
  if(req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Authors.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New author
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

// Create new author
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })
  try {
    const newAuthor = await author.save()
    res.redirect('authors')
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating author!'
    })
  }
})

module.exports = router