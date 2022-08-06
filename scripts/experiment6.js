/**
 * @type {CanvasRenderingContext2D}
 */

const memorisuu = 40;
const basezoom = 16;

let interval = 0;

let offset_x = 0;
let offset_y = 0;

let width = 0;
let height = 0;

function draw() {
    const canvas = document.getElementById('graph');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, width, height);
    init();

    const siki = document.getElementById('siki').value;

    const func = Function('x', 'return ' + siki);

    const zoom=magnification();

    let totalzoom = zoom*interval;

    ctx.strokeStyle='black';
    //ctx.strokeStyle='red';


    ctx.beginPath();    
    for (let i = -offset_x; i <= offset_x; i+=1) {
        const x= i/totalzoom;
        const y = -func(x)*totalzoom;
        ctx.lineTo(i + offset_x, y + offset_y);
        ctx.moveTo(i + offset_x, y + offset_y);
    }
    ctx.stroke();

    // ctx.beginPath();
    // ctx.moveTo(offset_x, -func(0)*totalzoom + offset_y);

    // for (let i = -1; i + offset_x >= 0; i-=step) {
    //     const x= i/totalzoom;
    //     const y = -func(x) * totalzoom;
    //     ctx.lineTo(i + offset_x, y + offset_y);
    //     ctx.moveTo(i + offset_x, y + offset_y);
    // }
    
    ctx.stroke();
}

function magnification()
{
    const zoom = Number(document.getElementById('zoom').value)/4;
    let bairitu = document.getElementById('bairitu');
    bairitu.innerText= String(zoom*100)+'%';

    return zoom;
}

function init() {
    const canvas = document.getElementById('graph');
    //const ctx=canvas.getContext('2d');

    resize(canvas);
    GraphMemory(canvas);
}

function resize(canvas) {
    const diswidth = canvas.clientWidth;
    const disheight = canvas.clientHeight;

    if (canvas.width != diswidth || canvas.height != disheight) {
        canvas.width = diswidth;
        canvas.height = disheight;
    }

    offset_x = diswidth / 2;
    offset_y = disheight / 2;

    width = diswidth;
    height = disheight;
}

function GraphMemory(canvas) {
    const ctx = canvas.getContext('2d');

    const WidInterval = width / memorisuu;
    const HeiInterval = height / memorisuu;

    interval = 0;
    if (WidInterval > HeiInterval)
        interval = HeiInterval;
    else
        interval = WidInterval;

    const phaseX = offset_x % interval;
    const phaseH = offset_y % interval;

    ctx.beginPath();
    ctx.strokeStyle = 'darkgray';
    for (let i = phaseX; i < width; i += interval) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
    }

    for (let i = phaseH; i < height; i += interval) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
    }
    ctx.stroke();

    ctx.strokeStyle = "dimgray";

    ctx.beginPath();
    ctx.moveTo(offset_x, 0);
    ctx.lineTo(offset_x, height);

    ctx.moveTo(0, offset_y);
    ctx.lineTo(width, offset_y);
    ctx.stroke();
}

window.onload = init();
