document.addEventListener('DOMContentLoaded', function () {
    domLoaded(pixelSize)
}, false);
var browserWidth = $(window).width();
var browserHeight = $(window).height();
var width = browserWidth;
var height = browserHeight;
var pixelSize = 8;
var xRes = width / pixelSize;
var yRes = height / pixelSize;
var paintColor = 'black';
var paintColor2 = 'white';
var grid = true;
var canvas = document.getElementById("pixelit");
var gridCanvas = document.getElementById("pixelitgrid");
var dropMenuActive = false;
var colorList = [
    ['black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown', 'Chartreuse', 'DarkGreen', 'DeepPink', 'white'],
    ['#000000', '#1A1A1A', '#333333', '#4C4C4C', '#666666', '#808080', '#999999', '#B2B2B2', '#CCCCCC', '#E6E6E6', '#FFFFFF', '#FFFFFF'],
    ['#0A0500', '#140A00', '#1F0F00', '#291400', '#331A00', '#3D1F00', '#472400', '#522900', '#5C2E00', '#663300', '#754719', '#855C33'],
    ['#1A0000', '#330000', '#4C0000', '#660000', '#800000', '#990000', '#B20000', '#CC0000', '#E60000', '#FF0000', '#FF1919', '#FF3333'],
    ['#00001A', '#000033', '#00004C', '#000066', '#000080', '#000099', '#0000B2', '#0000CC', '#0000E6', '#0000FF', '#1919FF', '#3333FF'],
    ['#001F00', '#002E00', '#003D00', '#004C00', '#005C00', '#006B00', '#007A00', '#008A00', '#009900', '#19A319', '#33AD33', '#4DB84D'],
    ['#333300', '#4C4C00', '#666600', '#808000', '#999900', '#B2B200', '#CCCC00', '#E6E600', '#FFFF00', '#FFFF19', '#FFFF33', '#FFFF4D'],
    ['#331400', '#4C1F00', '#662900', '#803300', '#993D00', '#B24700', '#CC5200', '#E65C00', '#FF6600', '#FF7519', '#FF8533', '#FF944D'],
    ['#140014', '#290029', '#3D003D', '#520052', '#660066', '#7A007A', '#8F008F', '#A300A3', '#B800B8', '#CC00CC', '#D119D1', '#D633D6']
];

// document.write(width);
// document.write(' x ');
// document.write(height);

var menus = ['sizeDropMenu','pixelDropMenu'];

function toggleDropMenu(selectedMenu) {
    for (menu in menus) {
        if (menus[menu] != selectedMenu) {
            document.getElementById(menus[menu]).style.display = "none";
        }
    }
    if (dropMenuActive == false) {
        document.getElementById(selectedMenu).style.display = "inline-block";
        dropMenuActive = true;
        }
    else {
        document.getElementById(selectedMenu).style.display = "none";
        dropMenuActive = false;
    }

}


function changeColor(evt) {
    var mousePos = getMousePos(colorCanvas, evt);
    context.fillStyle = colorList[Math.floor((mousePos.y / 50))][(Math.floor(mousePos.x / 50))];
}

function drawGrid(size) {
    pixelSize = size;
    gridCanvas = document.getElementById("pixelitgrid");
    gridContext = gridCanvas.getContext("2d");
    gridContext.fillStyle = 'white';
    gridContext.fillRect(0, 0, width, height);
    gridContext.fillStyle = 'black';
    for (xCount = pixelSize; xCount < width; xCount += pixelSize) {
        gridContext.fillRect(xCount, 0, 1, height);
        console.log(xCount);
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
    if (grid === true) {
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
        // width = width;
        // height = height;
        drawGrid(pixelSize);
    } else {
        return
    }
}

function pixelSizeChange(size) {
    pixelSize = size;
    drawGrid(pixelSize);
}

function createPNG() {
    var canvasImage = canvas.toDataURL("image/png");
    window.open(canvasImage);
}

function eraseCanvas() {
	if (confirm("Are you sure you want to erase the canvas?")) {
		context.fillStyle = 'white';
		context.fillRect(0,0, 10000, 10000);
	} else {
		return
	}
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
    for (yCount = 0; yCount < 12; yCount++) {
        for (xCount = 0; xCount < 9; xCount++) {
            colorContext.fillStyle = colorList[xCount][yCount];
            colorContext.fillRect(xCount * 25, yCount * 25, blockSize, blockSize);
        }
    }
    canvas.height = browserHeight * .90;
    canvas.width = browserWidth * .90;

    document.getElementById("sizeContainer").style.left = browserWidth * .9 + 115 + "px";
    gridCanvas.height = browserHeight * .90;
    gridCanvas.width = browserWidth * .90;
    drawGrid(pixelSize);

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
	
    currentColorContext.fillRect(0, 0, blockSize, blockSize);
    currentColorContext.fillStyle = paintColor2;
    currentColorContext.fillRect(0, 25, blockSize, blockSize);
    currentColorContext.fillStyle = paintColor;
	
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
			if (e.which == 1){
				context.fillStyle = paintColor;
				context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
			}
			if (e.which == 3){
				context.fillStyle = paintColor2;
				context.fillRect(Math.ceil(mousePos.x / pixelSize) * pixelSize - pixelSize, Math.ceil(mousePos.y / pixelSize) * pixelSize - pixelSize, pixelSize, pixelSize);
			}
		}
    }, false);



}