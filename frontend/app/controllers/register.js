import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({

	security: service(),

    id: null,

    disableRegister: computed.lt('id.length', 5),

	actions: {
		register: function(id) {
			this.get('security').register(id).then(() => {
				this.transitionToRoute('user', id);
			});
		}
	}
});