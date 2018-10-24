const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Update prototype settings
router.post('/settings-update', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let requireNewRp = req.session.data['require-new-responsible-person']

  if  (requireNewRp === 'true') {
    res.cookie('requireNewRp', true)
  } else {
    res.cookie('requireNewRp', false)
  }

  res.redirect('/')
})

// Branching on whether product was on sale pre brexit
router.post('/cosmetics/product-sale-date-check-answer', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names
  
    let onSaleBeforeEuExit = req.session.data['sale-before-eu-exit']
  
    if (onSaleBeforeEuExit === 'false') {
      res.redirect('/cosmetics/product-registered-on-cpnp')
    } else {
      res.redirect('/cosmetics/product-notify-date')
    }
  })

// Branching on whether user has CPNP product reference number
router.post('/cosmetics/cpnp-reference-submit', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let hasCpnpReferenceNumber = req.session.data['cpnp-reference']
  let cpnpProductReference = req.session.data['cpnp-product-reference']

  if (hasCpnpReferenceNumber === 'false') {
    res.redirect('/cosmetics/no-product-found')
  } else {
    res.redirect('/cosmetics/cpnp-product')
  }
})

// Branching on whether scraped CPNP product data is correct
router.post('/cosmetics/check-cpnp-product-correct', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let productDataIsCorrect = req.session.data['correct-product']

  if (productDataIsCorrect === 'false') {
    res.redirect('/cosmetics/search-again')
  } else {
    res.redirect('/cosmetics/check-responsible-person')
  }
})

// Branching on whether product has been registered on CPNP
router.post('/cosmetics/product-regsistered-on-cpnp-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let productRegisteredOnCpnp = req.session.data['registered-on-cpnp']

  if (productRegisteredOnCpnp === 'false') {
    res.redirect('/cosmetics/cpnp-advice')
  } else {
    res.redirect('/cosmetics/cpnp-export-upload')
  }
})

// Either send to product details check, or to section to add new RP depending on 
// value of settings cookie.
router.get('/cosmetics/check-responsible-person', function(req, res) {
  if (req.cookies['requireNewRp'] === 'true') {
    res.redirect('/cosmetics/responsible-person-name')
  } else {
    res.redirect('/cosmetics/check-product-details')
  }
})

module.exports = router
