import Service from '@ember/service';
import RSVP from 'rsvp';

const ALGO_NAME = 'ECDSA';

const ALGO_SIGN_VERIFY_SETUP = {
    name: ALGO_NAME,
    hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
};

const algoKeyGen = {
    name: ALGO_NAME,
    namedCurve: 'P-256', //can be 'P-256', 'P-384', or 'P-521'
};
const usages = ['sign', 'verify'];

const JSON_FMT = 'jwk';

export default Service.extend({

    generateKey() {
        return window.crypto.subtle.generateKey(algoKeyGen, true, usages).then(({publicKey, privateKey}) => {
            return RSVP.hash({
                publicKey: window.crypto.subtle.exportKey(JSON_FMT, publicKey),
                privateKey: window.crypto.subtle.exportKey(JSON_FMT, privateKey)
            });
        });
    },

    signData(privateKey, data) {
        return window.crypto.subtle.importKey(JSON_FMT, privateKey, algoKeyGen, false, usages).then((privateKey) => {
            return window.crypto.subtle.sign(ALGO_SIGN_VERIFY_SETUP, privateKey, data);            
        }).then(function(signature){
            return new Uint8Array(signature);
        });
    },

    verifySignature(publicKey, signature, data) {
        return window.crypto.subtle.importKey(JSON_FMT, privateKey, algoKeyGen, false, usages).then((publicKey) => {
            return window.crypto.subtle.verify(ALGO_SIGN_VERIFY_SETUP, publicKey, signature, data);            
        });
    }
});
