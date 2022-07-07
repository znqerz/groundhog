Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// document.getElementsByClassName('md-footer-copyright')[0].innerHTML = '<div class="md-footer-copyright__highlight"> Copyright © 2021 - 2030 eric </div>'
document.getElementsByClassName('md-footer-copyright')[0].remove()