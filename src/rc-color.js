const { loadImage } = require('@napi-rs/canvas');

const CanvasImage = require('./canvas-image');
const { quantize } = require('./mmcq');

const getPalette = (sourceImage, colorCount = 5, quality = 5) => {
    if (colorCount < 2 || colorCount > 256) {
        colorCount = 5;
    }
    if (quality < 1) {
        quality = 5;
    }

    // Create custom CanvasImage object.
    const image = new CanvasImage(sourceImage);
    const imageData = image.getImageData();
    const pixels = imageData.data;
    const pixelCount = image.getPixelCount();

    // Store the RGB values in an array format suitable for quantize function.
    const pixelArray = [];
    for (let i = 0, offset, r, g, b, a; i < pixelCount; i += quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        // If pixel is mostly opaque and not white.
        if (a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                pixelArray.push([r, g, b]);
            }
        }
    }

    const cmap = quantize(pixelArray, colorCount);
    const palette = cmap ? cmap.palette() : [[255, 255, 255]];

    return palette;
};

exports.getColor = (sourceImage, quality) => {
    const palette = getPalette(sourceImage, 5, quality);
    return palette[0];
};

exports.getPaletteFromURL = async (URL, colorCount, quality) => {
    return loadImage(URL).then(image => getPalette(image, colorCount, quality));
};

exports.getColorFromURL = async (imageURL, quality) => {
    return loadImage(imageURL).then(image => {
        const palette = getPalette(image, 5, quality);
        const dominantColor = palette[0];
        return dominantColor;
    });
};
