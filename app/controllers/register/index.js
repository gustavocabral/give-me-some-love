import Em from 'ember';
import Keys from 'give-me-love/utils/keys';

export default Em.Controller.extend({

    email: '',

    disableRegister: Em.computed.lt('email.length', 5),

	actions: {
		register: function (email) {
			// TODO: user should proceed from URL sent to his email.
			localStorage.setItem(Keys.USER_NAME, email);
			// We go directly to 'register.code' route as this is a prototype.
			this.transitionToRoute('register.code', (new Date()).getTime());
		}
	}
});