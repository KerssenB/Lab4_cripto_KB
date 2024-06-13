const CryptoJS = require('/home/kerssen/Documentos/Cripto/lab4/crypto-js.min.js');

// Se buscaron todas la mayúsculas del nuevo texto para crear la Clave.
const key = "EELLNETFLDALMCPEERLTAFNA";

const messages = [
    "hola",
    "esta",
    "es",
    "una",
    "nueva",
    "pagina",
    "para",
    "probar",
    "el",
    "script"
];

function encryptMessages(messages, key) {
    let encryptedMessages = [];

    messages.forEach(message => {
        let encrypted = CryptoJS.TripleDES.encrypt(message, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        encryptedMessages.push(encrypted);
    });

    return encryptedMessages;
}

let encryptedMessages = encryptMessages(messages, key);

// Imprimir los mensajes cifrados en la consola para luego colocarlos en el HTML.
encryptedMessages.forEach((encryptedMessage, index) => {
    console.log(`Mensaje ${index + 1}: ${encryptedMessage}`);
});
