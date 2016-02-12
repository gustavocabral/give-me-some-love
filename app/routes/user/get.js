import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		return Ember.Object.create({
			user: this.modelFor('user'),
			qrCode: 'this is your id so others can send you love'
		});
	}
});
