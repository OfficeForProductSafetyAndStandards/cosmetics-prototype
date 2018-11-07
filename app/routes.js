const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Branching on whether product has been registered on CPNP
router.post('/cosmetics/product-regsistered-on-cpnp-check', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let productRegisteredOnCpnp = req.session.data['registered-on-cpnp']

  if (productRegisteredOnCpnp === 'false') {
    res.redirect('/cosmetics/import/cpnp-advice')
  } else {
    res.redirect('/cosmetics/import/cpnp-export-upload')
  }
})

// Branching on whether to search again after incorrect product info found
router.post('/cosmetics/search-again-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let searchAgain = req.session.data['search-again']

  if (searchAgain === 'false') {
    res.redirect('/cosmetics/manual/product-name')
  } else {
    res.redirect('/cosmetics/scraped-data/product-notify-date')
  }
})

// Branching on whether user will be selling product in the EU
router.post('/cosmetics/intending-to-sell-in-eu', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let intendingToSellInEu = req.session.data['intending-to-sell-in-eu']

  if (intendingToSellInEu === 'toManual') {
    res.redirect('/cosmetics/manual/product-name')
  } else if (intendingToSellInEu === 'toAdvice') {
    res.redirect('/cosmetics/import/cpnp-advice')
  } else {
    res.redirect('/cosmetics/import/cpnp-export-upload')
  }
})

// Branching on whether product is single or multi component
router.post('/cosmetics/single-component', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let singleComponentProduct = req.session.data['single-component']

  if (singleComponentProduct === 'false') {
    res.redirect('/cosmetics/manual/multi-component-placeholder')
  } else {
    res.redirect('/cosmetics/manual/number-of-shades')
  }
})

// Branching on whether product comes in more than one shade
router.post('/cosmetics/multiple-shades', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let multipleShades = req.session.data['multiple-shades']

  if (multipleShades === 'false') {
    res.redirect('/cosmetics/manual/product-manufactured-in-uk')
  } else {
    res.redirect('/cosmetics/manual/list-shades')
  }
})

// Branching on whether product was manufactured in the UK
router.post('/cosmetics/manufactured-in-uk', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let manufacturedInUk = req.session.data['manufactured-in-uk']

  if (manufacturedInUk === 'false') {
    res.redirect('/cosmetics/manual/import-from')
  } else {
    res.redirect('/cosmetics/manual/toxic-products')
  }
})

// Branching on whether product contains toxic products
router.post('/cosmetics/contains-toxic-products', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let containsToxicProducts = req.session.data['contains-toxic-products']

  if (containsToxicProducts === 'false') {
    res.redirect('/cosmetics/manual/nanomaterials')
  } else {
    res.redirect('/cosmetics/manual/list-toxic-products')
  }
})

// Branching on whether product contains nanomaterials
router.post('/cosmetics/contains-nanomaterials', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let containsNanomaterials = req.session.data['contains-nanomaterials']

  if (containsNanomaterials === 'false') {
    res.redirect('/cosmetics/manual/physical-form')
  } else {
    res.redirect('/cosmetics/manual/add-nanomaterials')
  }
})

// Branching on which formulation type the user picks
router.post('/cosmetics/notification-type', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let notificationType = req.session.data['notification-type']

  if (notificationType === 'predefined') {
    res.redirect('/cosmetics/manual/predefined-placeholder')
  } else if (notificationType === 'exact') {
    res.redirect('/cosmetics/manual/exact')
  } else {
    res.redirect('/cosmetics/manual/ranges')
  }
})

// Branching on whether the user thinks the EU Responsible Person will approve their request 
// for becoming the UK responsible person.
router.post('/cosmetics/will-eu-rp-approve-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let willEuRpApprove = req.session.data['will-eu-rp-approve']

  if (willEuRpApprove === 'false') {
    res.redirect('/cosmetics/claim-existing/bulk-upload')
  } else {
    res.redirect('/cosmetics/claim-existing/eu-rp-email-address')
  }
})

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

module.exports = router
