import Service from '@ember/service';

export default Service.extend({
    /**
    * @param
    */
    getItem(key) {
        return window.localStorage.getItem(key);
    },

    setItem(key, value) {
        window.localStorage.setItem(key, value instanceof Object ? JSON.stringify(value) : value);
    },
});
