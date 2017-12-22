import Em from 'ember';

export default Em.Controller.extend({
    actions: {
        scan() {
            this.transitionToRoute('user.get.scan');
        }
    }
});