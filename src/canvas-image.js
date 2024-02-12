const { createCanvas } = require('@napi-rs/canvas');

module.exports = class CanvasImage {
    constructor(image) {
        const { width, height } = image;

        this.canvas = createCanvas(width, height);
        this.context = this.canvas.getContext('2d');

        this.width = width;
        this.height = height;

        this.context.drawImage(image, 0, 0, this.width, this.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    update(imageData) {
        this.context.putImageData(imageData, 0, 0);
    }

    getPixelCount() {
        return this.width * this.height;
    }

    getImageData() {
        return this.context.getImageData(0, 0, this.width, this.height);
    }
};
