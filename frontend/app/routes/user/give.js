import Em from 'ember';

export default Em.Route.extend({
    beforeModel: function() {
        this.transitionTo('user.give.scan');
    }
});
