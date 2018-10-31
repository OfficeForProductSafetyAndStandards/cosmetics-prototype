addAnother = function () {
    var list = document.getElementById('expanding-list')
    var listEntry = list.firstElementChild
    var newEntry = listEntry.cloneNode(true)

    // Update ID of inputs, wipe any values they have
    var inputs = newEntry.getElementsByTagName('input')
    console.log(inputs)
    var elementNumber = list.childElementCount + 1
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i])
        inputs[i].id = inputs[i].id + '-' + elementNumber
        inputs[i].name = inputs[i].name + '-' + elementNumber
        inputs[i].value = ''
        inputs[i].checked = false
    }


    list.appendChild(newEntry)
}
    
remove = function () {
    var list = document.getElementById('expanding-list')
    if (list.childElementCount > 1) {
        event.target.parentNode.remove()
    }
}