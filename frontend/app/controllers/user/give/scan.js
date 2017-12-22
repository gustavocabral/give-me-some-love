import Em from 'ember';
import DeviceAware from 'give-me-love/mixins/device-aware';

export default Em.Controller.extend(DeviceAware, {

    amount: undefined,

    receiver: undefined,

    hasNoReceiver: Em.computed.empty('receiver'),

    hasNoAmount: Em.computed.empty('amount'),

    disableConfirm: Em.computed.or('hasNoAmount', 'hasNoReceiver', 'noBalance'),

    noBalance: Em.computed('model.balance', 'amount', function() {
        return this.get('model.balance') < this.get('amount');
    }),

    reset() {
        this.set('amount', undefined);
        this.set('receiver', undefined);
    },

    actions: {
		confirm() {
            let transaction = Em.Object.create({
                receiver: this.get('receiver'),
                from: this.get('model.email'),
                amount: this.get('amount'),
                timestamp: (new Date()).toString()
            });
            this.reset();
            this.get('model').set('balance', this.get('model.balance') - transaction.get('amount'));
            this.transitionToRoute('user.give.send', transaction);
		},
    }
});