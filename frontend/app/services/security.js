import Service from '@ember/service';
import { inject as service } from '@ember/service';

const ID = 'id';
const PK = 'pk';

export default Service.extend({

    crypto: service(),
    
    localStorage: service(),

    register(id) {
        return this.get('crypto').generateKey().then(({publicKey, privateKey}) => {
            this.get('localStorage').setItem(ID, id);
            this.get('localStorage').setItem(PK, privateKey);
            // Register public key on server
            // id could be already used. Email confirmation required.
        });
    },

    getId() {
        return this.get('localStorage').getItem(ID);
    }
});
