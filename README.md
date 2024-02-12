# rc-color

Grab the color palette from an image using just Javascript in the browser and in Node.js


## Installation

`npm i rc-color`

or

`yarn add rc-color`

## Usage

### Get the Dominant Color from an Image

```js
const { getColorFromURL } = require('rc-color');

(async () => {
    const dominantColor = await getColorFromURL(imageURL);
})();
```

### Build a Color Palette from an Image

```js
const { getPaletteFromURL } = require('rc-color');

(async () => {
    const colorPallete = await getPaletteFromURL(imageURL);
})();
```
