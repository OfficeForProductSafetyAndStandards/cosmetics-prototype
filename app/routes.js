const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

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
    res.redirect('/cosmetics/check-product-details')
  }
})

module.exports = router
