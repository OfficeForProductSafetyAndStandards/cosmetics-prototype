
/*
* Method attached to the submit event of forms in the radio-route macro. This 
* function prevents the form submission, and instead sends it as an AJAX 
* request, and then instead sends the user to the page for the route they've 
* picked.
*/
routeToRadioChoice = function(event) {
    event.preventDefault()

    // If there is a checked radio button, route to that URL. Otherwise do nothing.
    if ($("#route-form input:checked").length) {
        // Get the URL of the checked radio
        var url = $("#route-form input:checked").data('route')

        // Submit the form as AJAX, then redirect to the URL when done.
        // The form route doesn't even have to exist, this just makes 
        // sure the data is saved in the session.
        $.ajax({
            url: '/radio-route',
            type: 'post',
            data: $('#route-form').serialize(),
            success: function() {
                window.location.href = url
            }
        })
    }
}