
var width = 1280;
var height = 720;
var pixelSize = 8;
var xRes = width / pixelSize;
var yRes = height / pixelSize;
var paintColor = 'black';
var paintColor2 = 'white';
var grid = true;
var dropMenuActive = false;
var pixelSizes = [2, 4, 8, 16, 32, 64, 128];
var colorList = [
    ['#ED693E', '#F2EBC7', 'blue', 'red', 'yellow', 'orange', '#8C20CC', '#CC924A', 'Chartreuse', 'DarkGreen', 'DeepPink', 'green'],
    ['#000000', '#1A1A1A', '#333333', '#4C4C4C', '#666666', '#808080', '#999999', '#B2B2B2', '#CCCCCC', '#E6E6E6', '#EEEEEE', '#FFFFFF']
];
var menus = ['colorDropMenu'];
var pixelSizeSelectorIdList = [2, 4, 8, 16, 32, 64, 128];
var pixelSizeIndex = 2;
var hexValues = ['A', 'B', 'C', 'D', 'E', 'F']
var colorPreview = [0, 0, 0];

function highlightPixelSize() {
    for (size in pixelSizeSelectorIdList) {
        if (pixelSizeSelectorIdList[size] == pixelSize) {
            document.getElementById(String(pixelSizeSelectorIdList[size]) + "Pixel").style.backgroundColor = '#DEDEDA';
        } else {
            document.getElementById(String(pixelSizeSelectorIdList[size]) + "Pixel").style.backgroundColor = 'white';
        }
    }
}

function showColorPreviewValue(newValue, id) {
    if (id == 'redValue') {
        colorPreview[0] = newValue;
    }
    if (id == 'greenValue') {
        colorPreview[1] = newValue;
    }
    if (id == 'blueValue') {
        colorPreview[2] = newValue;
    }
    updateColorPreview(colorPreview);
}

function updateColorPreview(RGBColor) {
    document.getElementById("colorHexValue").innerHTML = "(" + RGBColor[0] + "," + RGBColor[1] + "," + RGBColor[2] + ")";
    document.getElementById("dropMenuColorPreview").style.backgroundColor = "rgb(" + RGBColor[0] + "," + RGBColor[1] + "," + RGBColor[2] + ")";
}

function toggleDropMenu(selectedMenu) {
    for (menu in menus) {
        if (menus[menu] != selectedMenu) {
            document.getElementById(menus[menu]).style.display = "none";
        }
    }
    if (dropMenuActive == false) {
        document.getElementById(selectedMenu).style.display = "inline-block";
        dropMenuActive = true;
    } else {
        document.getElementById(selectedMenu).style.display = "none";
        dropMenuActive = false;
    }
}

function changeColor(evt) {
    var mousePos = getMousePos(colorCanvas, evt);
    context.fillStyle = colorList[Math.floor((mousePos.y / 50))][(Math.floor(mousePos.x / 50))];
}

function changeColorFromCustomPreview(mouseButton) {
    if (mouseButton == 1) {
        paintColor = document.getElementById("dropMenuColorPreview").style.backgroundColor;
    }
    if (mouseButton == 2) {
        paintColor2 = document.getElementById("dropMenuColorPreview").style.backgroundColor;
    }
}

function drawGrid(size) {
    pixelSize = size;
    highlightPixelSize()
    gridCanvas = document.getElementById("pixelitgrid");
    gridContext = gridCanvas.getContext("2d");
    gridContext.fillStyle = 'white';
    gridContext.fillRect(0, 0, width, height);
    gridContext.fillStyle = 'black';
    for (xCount = pixelSize; xCount < width; xCount += pixelSize) {
        gridContext.fillRect(xCount, 0, 1, height);
    }
    for (yCount = pixelSize; yCount < height; yCount += pixelSize) {
        gridContext.fillRect(0, yCount, width, 1);
    }

}

function removeGrid() {
    var gridCanvas = document.getElementById("pixelitgrid");
    var gridContext = gridCanvas.getContext("2d");
    gridContext.fillStyle = 'white';
    gridContext.fillRect(0, 0, width, height);
}

function toggleGrid() {
    if (grid == true) {
        removeGrid();
        grid = false;
    } else {
        drawGrid(pixelSize);
        grid = true;
    }
}

function changeCanvasSize(width, height) {
    if (confirm("Changing the canvas' size will erase it!")) {
        canvas.width = width;
        canvas.height = height;
        gridCanvas.width = width;
        gridCanvas.height = height;
        drawGrid(pixelSize);
        document.getElementById('sizePrompt').style.display = 'none';
    } else {
        return
    }
}

function changeCanvasSizePercent(widthPercent, heightPercent) {
    if (confirm("Changing the canvas' size will erase it!")) {
        canvas.width = browserWidth * widthPercent;
        canvas.height = browserHeight * heightPercent;
        gridCanvas.width = browserWidth * widthPercent;
        gridCanvas.height = browserHeight * heightPercent;
        drawGrid(pixelSize);
    } else {
        return
    }
}

function pixelSizeChange(size) {
    pixelSize = size;
    highlightPixelSize();
    document.getElementById('pixelSize').innerHTML = pixelSize;
    drawGrid(pixelSize);
}

function increasePixelSize() {
    if (pixelSize == 128) {
        return
    } else {
        pixelSizeChange(pixelSizes[pixelSizes.indexOf(pixelSize) + 1])
    }
}

function decreasePixelSize(currentSize) {
    if (pixelSize == 2) {
        return
    } else {
        pixelSizeChange(pixelSizes[pixelSizes.indexOf(pixelSize) - 1])
    }
}

function exportPNG() {
    var canvasImage = canvas.toDataURL("image/png");
    window.open(canvasImage);
}

function exportJPG() {
    var jpegImage = canvas.toDataURL("image/jpg");
    window.open(jpegImage);
}

function eraseCanvas() {
    if (confirm("Are you sure you want to erase the canvas?")) {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
    } else {
        return
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawLine(coords1, coords2) {
    //Not implemented currently
    context.beginPath();
    context.moveTo(coords1[0], coords1[1]);
    context.lineTo(coords2[0], coords2[1]);
    context.closePath();
    context.stroke();
}

function domLoaded(size) {
    canvas = document.getElementById("pixelit");
    context = canvas.getContext("2d");
    var colorCanvas = document.getElementById("colorCanvas");
    var colorContext = colorCanvas.getContext("2d");
    var gridCanvas = document.getElementById("pixelitgrid");
    var gridContext = gridCanvas.getContext("2d");
    var currentColorCanvas = document.getElementById("currentColors");
    var currentColorContext = currentColorCanvas.getContext("2d");
    
    var mouseDown = 0;
    pixelSize = size
    var blockSize = 25;

    canvas.width = 1280;
    canvas.height = 720;

    gridCanvas.width = 1280;
    gridCanvas.height = 720;

    document.getElementById('pixelSize').innerHTML = pixelSize;
    document.getElementById('uiMinus').innerHTML = '-';
    document.getElementById('uiPlus').innerHTML = '+';

    drawGrid(pixelSize);


    currentColorContext.fillRect(0, 0, blockSize, blockSize);
    currentColorContext.fillStyle = paintColor2;
    currentColorContext.fillRect(0, 25, blockSize, blockSize);
    currentColorContext.fillStyle = paintColor;

    for (yCount = 0; yCount < 12; yCount++) {
        for (xCount = 0; xCount < 2; xCount++) {
            colorContext.fillStyle = colorList[xCount][yCount];
            colorContext.fillRect(xCount * 25, yCount * 25, blockSize, blockSize);
        }
    }



    colorCanvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(colorCanvas, evt);
        paintColor = colorList[Math.floor((mousePos.x / 25))][(Math.floor(mousePos.y / 25))];
        currentColorContext.fillStyle = paintColor;
        currentColorContext.fillRect(0, 0, blockSize, blockSize);
    }, false);

    colorCanvas.addEventListener('contextmenu', function (evt) {
        var mousePos = getMousePos(colorCanvas, evt);
        paintColor2 = colorList[Math.floor((mousePos.x / 25))][(Math.floor(mousePos.y / 25))];
        currentColorContext.fillStyle = paintColor2;
        currentColorContext.fillRect(0, 25, blockSize, blockSize);

    }, false);

    dropMenuColorPreview.addEventListener('click', function (evt) {
        changeColorFromCustomPreview(1);
        currentColorContext.fillStyle = paintColor;
        currentColorContext.fillRect(0, 0, blockSize, blockSize);
    }, false);

    dropMenuColorPreview.addEventListener('contextmenu', function (evt) {
        changeColorFromCustomPreview(2);
        currentColorContext.fillStyle = paintColor2;
        currentColorContext.fillRect(0, 25, blockSize, blockSize);
    }, false);

    gridCanvas.addEventListener('click', function (evt) {
        context.fillStyle = paintColor;
        var mousePos = getMousePos(gridCanvas, evt);
        context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
    }, false);

    gridCanvas.addEventListener('contextmenu', function (evt) {
        context.fillStyle = paintColor2;
        var mousePos = getMousePos(gridCanvas, evt);
        context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
    }, false);

    gridCanvas.addEventListener('mousedown', function (ev) {
        mouseDown = 1;
    }, false);

    gridCanvas.addEventListener('mouseup', function (ev) {
        mouseDown = 0;
    }, false);

    gridCanvas.addEventListener('mousemove', function (ev) {
        var e = window.event
        context.fillStyle = paintColor;
        var mousePos = getMousePos(gridCanvas, ev);
        if (mouseDown == 1) {
            context.fillStyle = paintColor;
            context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
            if (e.which == 1) {
                context.fillStyle = paintColor;
                context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
            }
            if (e.which == 3) {
                context.fillStyle = paintColor2;
                context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
            }
        }
    }, false);

    document.getElementById('pixelit').style.display = 'block';
    document.getElementById('pixelitgrid').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    domLoaded(pixelSize)
}, false);