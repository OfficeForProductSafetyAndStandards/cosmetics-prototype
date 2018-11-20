const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// After user logs in checks if they've already set a responsible person or need 
// to enter a new one
router.get('/cosmetics/enter-responsible-person', function(req, res) {
  if (req.session.data['responsiblePersonExists']) {
    res.redirect('/cosmetics/landing-page')
  } else {
    res.redirect('/cosmetics/responsible-person/responsible-person-name')
  }
})

// Sets a flag to mark that the user has entered a responsible person and 
// redirects to the login landing page
router.get('/cosmetics/responsible-person-entered', function(req, res) {
  req.session.data['responsiblePersonExists'] = true
  res.redirect('/cosmetics/landing-page')
})

// Stores a list of the components in the session cookie.
router.post('/cosmetics/list-components', function(req, res) {
  var components = Object.keys(req.session.data)
    .filter(function(key) {
      return key.startsWith("list-entry")
    })
    .map(function(key) {
      return req.session.data[key]
  })

  req.session.data['componentList'] = components
  req.session.data['numberOfComponents'] = components.length
  
  res.redirect('/cosmetics/manual/components-mixed')
})

// Stores a list of toxic products in the session cookie.
router.post('/cosmetics/list-cmr', function(req, res) {
  var substances = Object.keys(req.session.data)
    .filter(function(key) {
      return key.startsWith("substance-name")
    })
    .map(function(key) {
      return req.session.data[key]
  })

  req.session.data['toxic-products'] = substances
  
  res.redirect('/cosmetics/manual/nanomaterials')
})

// User is sent to this endpoint at end of multi component loop. If they have 
// components left to fill in info for they are sent back to the start of the 
// loop. Otherwise they proceed to the label image.
// For single component this method will just head to the label image 
router.get('/cosmetics/component-done', function(req, res) {
  if (req.session.data['single-or-multi-component'] === 'multi') {
    var components = req.session.data['componentList']
    console.log(components)
  
    // Drop first element
    if (components) {
      components.shift()
    }

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
