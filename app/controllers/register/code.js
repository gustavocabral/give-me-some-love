import Ember from 'ember';
import Keys from 'give-me-love/utils/keys';

export default Ember.Controller.extend({
	actions: {
		enterCode: function (code) {
			// Use 'code' to encrypt `model.privateKey` and save it at local storage
			localStorage.setItem(Keys.ENCRYPTED_PRIVATE_KEY, this.get('model.privateKey') + '-' + code);
			this.transitionTo('user');
		}
	}
});