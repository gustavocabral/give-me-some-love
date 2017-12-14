import Ember from 'ember';

export default Ember.Mixin.create({

    isMobile: Ember.computed.or('isAndroid', 'iOS', 'isBlackBerry', 'isOperaMini', 'isWindowsPhone'),

    isAndroid: Ember.computed(function() {
        return navigator.userAgent.match(/Android/i);
    }),

    isIOS: Ember.computed(function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }),

    isBlackBerry: Ember.computed(function() {
        return navigator.userAgent.match(/BlackBerry/i);
    }),

    isOperaMini: Ember.computed(function() {
        return navigator.userAgent.match(/Opera Mini/i);
    }),

    isWindowsPhone: Ember.computed(function() {
        return navigator.userAgent.match(/IEMobile/i);
    })
});