import Em from 'ember';
import DeviceAware from 'give-me-love/mixins/device-aware';

export default Em.Controller.extend(DeviceAware, {

    scanningDone: Em.observer('transaction', function() {
        let transactionStr = this.get('transaction');
        if (!transactionStr) { return; }

        let transaction = Em.Object.create(JSON.parse(transactionStr.slice(1, -1)));
        this.get('model').set('balance', this.get('model.balance') + parseInt(transaction.get('amount')));
        this.transitionToRoute('user.get.send', transaction);
    })
});