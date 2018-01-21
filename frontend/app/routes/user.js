import Ember from 'ember';
import CheckRegister from 'give-me-love/mixins/routes/check-register';

export default Ember.Route.extend(CheckRegister, {
	model: function(params) {
		// TODO: Use ember-data store to retrive user from server
		return Ember.Object.create({
			email: params.id,
			name: "John Doe",
			balance: 100.00
		});
	},
	actions: {
		give: function() {
			this.transitionTo('user.give');
		},
		get: function() {
			this.transitionTo('user.get');
		},
		goToMenu: function() {
			this.transitionTo('user.index');
		}
	}
});
