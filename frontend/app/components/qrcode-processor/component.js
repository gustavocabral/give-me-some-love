import Em from 'ember';

// windows, navigator
var WIDTH = "800",
	HEIGHT = "600";

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
        //let canvas = this.getCanvas();
        //canvas.clearRect(0, 0, WIDTH, HEIGHT);

        let reader = new FileReader();
        reader.onload = function(e) {
            //canvas.clearRect(0, 0, gCanvas.width, gCanvas.height);
            //canvas.drawImage(v,0,0)
            qrcode.decode(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    },

    getCanvas: function() {
        let $canvas = this.$('#qr-canvas').get(0);
        $canvas.width = WIDTH;
        $canvas.height = HEIGHT;
        return $canvas.getContext('2d');
    },
});