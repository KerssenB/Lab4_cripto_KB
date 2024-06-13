const expectedHash = 'mgWScxWVKP8F7PBbpNp7i/aSb17kN0LcifBpahAplF3Mn0GR4/u1oMpWIm2rD8yY'; // Replace <hash_value> with the actual hash

    function calculateHash(buffer) {
        return crypto.subtle.digest('SHA-384', buffer).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
            return hashBase64;
        });
    }

    // Function to load and verify the script
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