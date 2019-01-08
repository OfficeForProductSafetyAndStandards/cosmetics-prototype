/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})


$(document).ready(function () {

  var exampleNumber = function() {
    return  Math.floor((Math.random() * 100000) + 1);
  }
  $(".ukCosmeticNumber").html(exampleNumber)

})
