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


$(document).ready(function () {
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  var dateNumber = function(min, max) {
    return function() {
      return getRandomInt(min, max);
    }
  }

  $(".cpnpDay").html(dateNumber(10, 28));
  $(".cpnpMonth").html(dateNumber(1, 9));
  $(".cpnpYear").html(dateNumber(14, 18));
})