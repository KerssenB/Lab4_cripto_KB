// ==UserScript==
// @name         Lab4_Cripto_N
// @namespace    http://tampermonkey.net/
// @version      3
// @description  Script del Lab4 de Cripto.
// @author       Ker
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
// ==/UserScript==

(function() {
    'use strict';

    // SRI
    const expectedHash = 'mgWScxWVKP8F7PBbpNp7i/aSb17kN0LcifBpahAplF3Mn0GR4/u1oMpWIm2rD8yY'; // Replace <hash_value> with the actual hash

    function calculateHash(buffer) {
        return crypto.subtle.digest('SHA-384', buffer).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
            return hashBase64;
        });
    }

    // SRI
    function loadAndVerifyScript(url, expectedHash) {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(buffer => calculateHash(buffer).then(hash => {
                if (hash === expectedHash) {
                    const script = document.createElement('script');
                    script.src = url;
                    document.head.appendChild(script);
                    script.onload = init;
                } else {
                    console.error('Hash no coincide: Hash esperado: ' + expectedHash + ', Hash obtenido: ' + hash);
                }
            }))
            .catch(err => console.error('Error al cargar el script.:', err));
    }

    function init() {
        // Paso 1
        function findMayus() {
            var text = document.body.textContent;
            var mayus = text.match(/[A-Z]/g);

            if (mayus) {
                var key = mayus.join('');
                console.log('La llave es: ' + key);

                // Ejecución para el Paso 3
                countMsg();
                decryptMsg(key);
            }
        }

        // Paso 2
        function countMsg() {
            var msg = document.querySelectorAll('[class^="M"]');
            console.log('Los mensajes cifrados son: ' + msg.length);
        }

        // Paso 3
        function decryptMsg(key) {
            var messages = document.querySelectorAll('[class^="M"]');

            messages.forEach(function(message) {
                var text64 = message.id;
                var keyUtf8 = CryptoJS.enc.Utf8.parse(key);

                var decryptedMessage = CryptoJS.TripleDES.decrypt(
                    { ciphertext: CryptoJS.enc.Base64.parse(text64) },
                    keyUtf8,
                    { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
                );

                var decryptedText = decryptedMessage.toString(CryptoJS.enc.Utf8);

                if (decryptedText) {
                    var decryptedElement = document.createElement('div');
                    decryptedElement.textContent = decryptedText;
                    message.parentNode.appendChild(decryptedElement);
                    console.log(text64 + ' ' + decryptedText);
                }
            });
        }

        window.addEventListener('load', findMayus);
    }

    // Verificar con SRI
    loadAndVerifyScript('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js', expectedHash);
})();
