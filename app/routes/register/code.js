import Ember from 'ember';

export default Ember.Route.extend({
	model: function (params) {
		/// TODO: use reg_id to retrive PRIVATE_KEY from server
		return Ember.Object.create({
			privateKey: params.reg_id // use reg_id as private_key for now,
		});
	}
});
