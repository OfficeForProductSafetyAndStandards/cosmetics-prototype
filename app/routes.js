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

router.get('/cosmetics/import/cpnp-export-upload', function(req, res) {
  req.session.data['refresh-count'] = 0
  res.render('cosmetics/import/cpnp-export-upload');
})

router.get('/cosmetics/upload', function(req, res) {
  req.params = {};
  if (typeof(req.session.data['cpnp-upload']) === 'string') {
    req.session.data['cpnp-upload'] = [req.session.data['cpnp-upload']]
  }

  req.session.data['draft-uploads'] = []
  req.session.data['error-uploads'] = []
  req.session.data['completed-uploads'] = []
  for (i = 0; i < req.session.data['cpnp-upload'].length; i++) {
    // Even numbered uploads become drafts, odd numbered uploads become errors
    if (i % 2) {
      // Add file to errors list
      req.session.data['error-uploads'].push({
        id: i,
        filename: req.session.data['cpnp-upload'][i],
        reason: getRandomErrorReason()
      })
    } else {
      // Add file to drafts list
      req.session.data['draft-uploads'].push({
        id: i,
        filename: req.session.data['cpnp-upload'][i],
        uk_product_number: Math.floor((Math.random() * 100000) + 1),
        industry_reference_number: Math.floor((Math.random() * 100000) + 1),
        cpnp_reference_number: Math.floor((Math.random() * 100000) + 1),
        date_notified: dateNumber(10, 28) + '/0' + dateNumber(1, 9) + '/20' + dateNumber(14, 18),
        files_required: true
      })
    }
  }

  res.redirect('/cosmetics/landing-page/notified-cosmetics');
})

router.get('/cosmetics/landing-page/notified-cosmetics', function(req, res) {
  req.params = {};

  if (!req.session.data['refresh-count']) {
    req.session.data['refresh-count'] = 0
  }
  req.session.data['refresh-count']++

  // if (req.session.data['product-registered']) {
  //  req.session.data['registered-product'] = req.session.data['product-registered']
  //  req.session.data['product-registered'] = null
  // } else {
  //  req.session.data['registered-product'] = null
  // }
  req.session.data['product-registered'] = null


  res.render('cosmetics/landing-page/notified-cosmetics');
})

router.get('/cosmetics/dismiss-error/:id', function(req, res) {
  req.session.data['error-uploads'] = req.session.data['error-uploads']
    .filter(error => error.id != req.params['id'])

  res.redirect('/cosmetics/landing-page/notified-cosmetics');
})

router.get('/cosmetics/dismiss-all-errors', function(req, res) {
  req.session.data['error-uploads'] = []
  res.redirect('/cosmetics/landing-page/notified-cosmetics');
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

router.get('/cosmetics/start-additional-files-upload/:id', function(req, res) {
  req.session.data['export-draft-id'] = req.params['id']
  res.redirect('/cosmetics/import/formulation-upload')
})

router.get('/cosmetics/incomplete-product/:id', function(req, res) {
  req.session.data['selected-product-id'] = req.params['id']
  res.redirect('/cosmetics/incomplete-product')
})

router.get('/cosmetics/submit', function(req, res) {
  if (req.session.data['export-draft-id']) {
    id = req.session.data['export-draft-id']
    draft = req.session.data['draft-uploads'].find(draftNotification => draftNotification.id == id)
    
    req.session.data['completed-uploads'].push(draft)

    req.session.data['draft-uploads'] = req.session.data['draft-uploads']
      .filter(draftNotification => draftNotification.id != id)

    req.session.data['export-draft-id'] = null

    req.session.data['product-registered'] = draft.filename
  }

  res.redirect('/cosmetics/landing-page/notified-cosmetics#registered-cosmetic-products')
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function dateNumber(min, max) {
  return getRandomInt(min, max);  
}

function getRandomErrorReason() {
  errors = [
    'Error parsing cosmetics information from file',
    'Error while performing anti-virus scanning'
  ]

  return errors[Math.floor(Math.random() * errors.length)]
}

module.exports = router
