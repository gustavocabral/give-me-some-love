import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Mixin.create({

    security: service(),

	beforeModel: function() {
        const id = this.get('security').getId()
        return id ? this.transitionTo('user', id) : this.transitionTo('register');
	}
});