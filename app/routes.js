const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// After user logs in checks if they've already set a responsible person or need 
// to enter a new one
router.get('/cosmetics/enter-responsible-person', function(req, res) {
  if (req.session.data['responsiblePersonExists']) {
    res.redirect('/cosmetics/landing-page/cosmetics-notified-before-eu-exit')
  } else {
    res.redirect('/cosmetics/responsible-person/create-or-join-existing')
  }
})

// After creating a new emergency contact, if the UK RP matchs scraped products then take thtem to them,
// if not go to dashboard
// to enter a new one
router.get('/cosmetics/display-if-scraped-products', function(req, res) {
  if (req.session.data['does-UK-RP-match-scraped-products'] == 'true') {
    res.redirect('/cosmetics/responsible-person/associate-products-with-rp')
  } else {
    res.redirect('/cosmetics/landing-page/cosmetics-notified-before-eu-exit')
  }
})

// Sets a flag to mark that the user has entered a responsible person and 
// redirects to the login landing page
router.get('/cosmetics/responsible-person-entered', function(req, res) {
  req.session.data['responsiblePersonExists'] = true
  res.redirect('/cosmetics/responsible-person/check-rp-email')
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

// Deletes responsilbe person
router.get('/cosmetics/delete-responsible-person', function(req, res) {
  req.session.data['responsiblePersonExists'] = false
  req.session.data['responsible-person-name'] = ''
  req.session.data['responsible-person-address'] = ''
  req.session.data['responsible-person-email'] = ''
  req.session.data['responsible-person-phone'] = ''
  res.redirect('/cosmetics/landing-page/responsible-person')
})

module.exports = router
