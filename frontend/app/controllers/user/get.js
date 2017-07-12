import Em from 'ember';

export default Em.Controller.extend({

    scanning: undefined,

    transaction: undefined,

    transactionObject: Em.computed('transaction', function () {
        // Removes quotes inside string
        return JSON.parse(this.get('transaction').slice(1, -1));
    }),

	actions: {
		scan: function () {
            this.set('scanning', true);
		},

        claim: function () {
            this.get('model').set('balance', this.get('model.balance') + parseInt(this.get('transactionObject.amount')));
            this.set('scanning', false);
        }
    }
});