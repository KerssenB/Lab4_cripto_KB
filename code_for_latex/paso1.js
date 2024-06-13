function findMayus() {
    var text = document.body.textContent;
    var mayus = text.match(/[A-Z]/g);
    
    if (mayus) {
        var key = mayus.join('');
        console.log('La llave es: ' + key);

    }
}