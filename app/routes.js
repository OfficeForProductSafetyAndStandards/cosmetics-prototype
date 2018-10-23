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

module.exports = router
