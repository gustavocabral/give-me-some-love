import Ember from 'ember';
import Keys from 'give-me-love/utils/keys';

export default Ember.Mixin.create({
	beforeModel: function () {
		var userName = localStorage.getItem(Keys.USER_NAME),
			encryptedPrivateKey = localStorage.getItem(Keys.ENCRYPTED_PRIVATE_KEY);

        let route = !userName || !encryptedPrivateKey ? 'register.index' : 'user';
        this.transitionTo(route);
	}
});