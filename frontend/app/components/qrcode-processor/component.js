import Em from 'ember';

export default Em.Component.extend({
    classNames: ['qrcode-processor'],

    readValue: null,

    initFileSelection: Em.on('didInsertElement', function() {
        this.$('input').get(0).addEventListener("change", this.onFileSelected, false);

        qrcode.callback = (text) => {
            console.log(`value read: ${text}`);
            this.set('readValue', text);
        };
    }),

    onFileSelected(e){
        let file = e.target.files[0],
            img = this.$('img');

        img.file = file;

        let reader = new FileReader();
        reader.onload = function(e) {
            let file = e.target.result;
            img.src = file;
            qrcode.decode(file);
        };
        reader.readAsDataURL(file);
    },

    actions: {
        scan() {
            this.$('input').click();
        }
    }
});