import Em from 'ember';
import Keys from 'give-me-love/utils/keys';

export default Em.Controller.extend({

    code: '',

    disableConfirm: Em.computed.lt('code.length', 5),

    actions: {
		confirmCode: function(code) {
			// Use 'code' to encrypt `model.privateKey` and save it at local storage
			localStorage.setItem(Keys.ENCRYPTED_PRIVATE_KEY, this.get('model.privateKey') + '-' + code);
			this.transitionToRoute('user');
		}
	}
});