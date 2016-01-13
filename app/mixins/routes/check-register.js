import Ember from 'ember';
import Keys from 'give-me-love/utils/keys';

export default Ember.Mixin.create({
	beforeModel: function () {
		var userName = localStorage.getItem(Keys.USER_NAME),
			encryptedPrivateKey = localStorage.getItem(Keys.ENCRYPTED_PRIVATE_KEY);
		if (!userName || !encryptedPrivateKey) {
			this.transitionTo('register.index');
		} else {
			this.transitionTo('user');
		}
	}
});