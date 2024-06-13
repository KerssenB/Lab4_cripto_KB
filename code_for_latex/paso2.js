function countMsg() {
    var msg = document.querySelectorAll('[class^="M"]');
    console.log('Los mensajes cifrados son: ' + msg.length);
}