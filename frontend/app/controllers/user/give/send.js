import Em from 'ember';

export default Em.Controller.extend({

    transaction: Em.computed('model', function() {
        let model = this.get('model');
        return model ? JSON.stringify(model) : undefined;
    })
});