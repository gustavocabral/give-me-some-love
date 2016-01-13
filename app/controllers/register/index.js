import Ember from 'ember';
import Keys from 'give-me-love/utils/keys';

export default Ember.Controller.extend({
	actions: {
		register: function (email) {
			// TODO: user should proceed from URL sent to his email.
			localStorage.setItem(Keys.USER_NAME, email);
			// We go direcly to 'register.code' route as this is a prototype.
			this.transitionTo('register.code', (new Date()).getTime());
		}
	}
});