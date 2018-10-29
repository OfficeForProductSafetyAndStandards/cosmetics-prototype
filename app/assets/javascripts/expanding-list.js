addAnother = function () {
    var list = document.getElementById('expanding-list')
    var listEntry = list.lastElementChild
    var newEntry = listEntry.cloneNode(true)
    list.appendChild(newEntry)
}
    
remove = function () {
    var list = document.getElementById('expanding-list')
    if (list.childElementCount > 1) {
        event.target.parentNode.remove()
    }
}