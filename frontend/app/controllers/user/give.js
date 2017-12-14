import Em from 'ember';
import DeviceAware from 'give-me-love/mixins/device-aware';

export default Em.Controller.extend(DeviceAware, {

    amount: undefined,

    receiver: undefined,

    hasNoReceiver: Em.computed.empty('receiver'),

    hasNoAmount: Em.computed.empty('amount'),

    disableConfirm: Em.computed.or('hasNoAmount', 'hasNoReceiver', 'noBalance'),

    noBalance: Em.computed('model.balance', 'amount', function () {
        return this.get('model.balance') < this.get('amount');
    }),

    transactionObject: undefined,

    transaction: Em.computed('transactionObject', function () {
        let transactionObject = this.get('transactionObject');
        return transactionObject ? JSON.stringify(this.get('transactionObject')) : undefined;
    }),

    showNewBalance: false,

	actions: {
		confirm: function () {

            let transactionObject = {
                to: this.get('receiver'),
                from: this.get('model.email'),
                amount: this.get('amount'),
                timestamp: (new Date()).toString()
            };
            this.set('transactionObject', transactionObject);
		},

        send: function () {
            this.set('showNewBalance', true);
            this.get('model').set('balance', this.get('model.balance') - this.get('transactionObject.amount'));
        }
	}
});