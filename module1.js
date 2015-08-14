class ImageUtils {

    static getCanvas(w, h) {
        var c = document.querySelector("canvas");
        c.width = w;
        c.height = h;
        return c;
    }

    static getPixels(img) {
        var c = ImageUtils.getCanvas(img.width, img.height);
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0,0,c.width,c.height);
    }

    static putPixels(imageData, w, h) {
        var c = ImageUtils.getCanvas(w, h);
        var ctx = c.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

// function definitions here


$(document).ready(function() {
    var img = new Image();
    img.src = "img/heyy.jpg";

    var pixels = ImageUtils.getPixels(img);
    var heightPixelsToHide = 100;
    for(var i = 0; i < img.width * heightPixelsToHide * 4; i++) {
        pixels.data[i] = 255;}
    ImageUtils.putPixels(pixels, img.width, img.height);
    makeMoreGreen(img);
    makeMoreBlue(img);
    brighten(img,-50);
    makeInvert(img,100);
    getRandomInt(-50,50);
    makeNoise(img,40);
    makeFunky(img);
});


function makeMoreBlue(img)

{
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i+2] = data[i+2] + 50;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeMoreGreen(img)

{
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 2) {
        data[i+3] = data[i+3] + 70;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}


function brighten(img,adjustment)

{
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length; i += 4) {
        data[i] = data[i] + adjustment;
        data[i+1] = data[i+1] + adjustment;
        data[i+2] = data[i+2] + adjustment;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}
 function makeInvert(img,adjustment)
 {  var pixels = ImageUtils.getPixels(img);
     var length = pixels.data.length;
     var data = pixels.data;

     for (var i = 0; i < length; i += 4) {
         data[i] = 255 - data[i];
         data[i+1] = 255 - data[i+1];
         data[i+2] = 255 - data[i+2];
     }
     ImageUtils.putPixels(pixels, img.width, img.height);}

function makeNoise(img, level) {

    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length;i += 4) {

        var adjustment = getRandomInt(-level, level);

        data[i] = data[i] + adjustment;
        data[i+1] = data[i+1] + adjustment;
        data[i+2] = data[i+2] + adjustment;

    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}

function makeFunky(img) {
    var pixels = ImageUtils.getPixels(img);
    var length = pixels.data.length;
    var data = pixels.data;

    for (var i = 0; i < length/2; i += 4) {
        var temp = data[i];
        data[i] = data[length - i];
        data[length - i] = temp;
    }
    ImageUtils.putPixels(pixels, img.width, img.height);
}