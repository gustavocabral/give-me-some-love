import Ember from 'ember';
import Keys from 'give-me-love/utils/keys';
import CheckRegister from 'give-me-love/mixins/routes/check-register';

export default Ember.Route.extend(CheckRegister, {
	model: function () {
		// TODO: Use ember-data store user object
		return Ember.Object.create({
			email: localStorage.getItem(Keys.USER_NAME),
			name: "John Doe",
			balance: 100.00
		});
	},
	actions: {
		give: function () {
			this.transitionTo('user.give');
		},
		get: function () {
			this.transitionTo('user.get');
		},
		goToMenu: function () {
			this.transitionTo('user.index');
		}
	}
});
