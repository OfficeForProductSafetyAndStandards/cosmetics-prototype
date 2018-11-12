const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// After user logs in checks if they've already set a responsible person or need 
// to enter a new one
router.get('/cosmetics/enter-responsible-person', function(req, res) {
  if (req.cookies['responsiblePersonExists'] === 'true') {
    res.redirect('/cosmetics/landing-page')
  } else {
    res.redirect('/cosmetics/responsible-person/responsible-person-name')
  }
})

// Sets a cookie to mark that the user has entered a responsible person and 
// redirects to the login landing page
router.get('/cosmetics/responsible-person-entered', function(req, res) {
  res.cookie('responsiblePersonExists', true)
  console.log()
  res.redirect('/cosmetics/landing-page')
})

// Sets a cookie containing a list of the components the user has added for 
// this product
router.post('/cosmetics/list-components', function(req, res) {
  var components = Object.keys(req.session.data)
    .filter(function(key) {
      return key.startsWith("list-entry")
    })
    .map(function(key) {
      return req.session.data[key]
  })

  res.cookie('componentList', components)
  req.session.data['componentList'] = components
  
  res.redirect('/cosmetics/manual/components-mixed')
})

// User is sent to this endpoint at end of multi component loop. If they have 
// components left to fill in info for they are sent back to the start of the 
// loop. Otherwise they proceed to the label image.
// For single component this method will just head to the label image 
router.get('/cosmetics/component-done', function(req, res) {
  if (req.session.data['single-or-multi-component'] === 'multi') {
    var components = req.cookies['componentList']
  
    // Drop first element
    if (components) {
      components.shift()
    }
    res.cookie('componentList', components)

    req.session.data['componentList'] = components

    // If there are components left to enter data for, return to start of loop. 
    // Otherwise proceed.
    if (components && components.length) {
      res.redirect('/cosmetics/manual/number-of-shades')
    } else {
      res.redirect('/cosmetics/manual/label-image')
    }
  } else {
    res.redirect('/cosmetics/manual/label-image')
  }
})

module.exports = router
