import Em from 'ember';

export default Em.Route.extend({
	model: function() {
        return this.modelFor('user');
	},

    actions: {
        goToMenu() {
            this.controller.reset();
            return true;
        }
    }
});
