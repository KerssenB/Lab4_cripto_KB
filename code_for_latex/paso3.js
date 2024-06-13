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