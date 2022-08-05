const memorisuu=40;

function draw(){
    const canvas=document.getElementById('graph');
    const ctx=canvas.getContext('2d')

    const func = document.getElementById('siki').value;

    //console.log(func);

    console.log(Function(func));
}

function init(){
    const canvas=document.getElementById('graph');
    const ctx=canvas.getContext('2d');

    resize(canvas);
    GraphMemory(canvas);
    const width =canvas.width;
    const height =canvas.height;

}

function resize(canvas) {
    const diswidth=canvas.clientWidth;
    const disheight=canvas.clientHeight;

    if(canvas.width != diswidth||canvas.height!=disheight)
    {
        canvas.width=diswidth;
        canvas.height=disheight;
    }
}

function GraphMemory(canvas) {
    const ctx=canvas.getContext('2d');

    const width=canvas.width;
    const height=canvas.height;

    const WidInterval=width/memorisuu;
    const HeiInterval=height/memorisuu;
    
    let interval=0;
    if(WidInterval>HeiInterval)
        interval = HeiInterval;
    else
        interval = WidInterval;

    const phaseX = width/2%interval;
    const phaseH = height/2%interval;

    ctx.beginPath();
    ctx.strokeStyle = 'darkgray';
    for(let i=phaseX;i < width ; i+=interval){
        ctx.moveTo( i ,0);
        ctx.lineTo( i ,height);
    }

    for(let i=phaseH;i < height ; i+=interval){
        ctx.moveTo( 0 ,i);
        ctx.lineTo( width ,i);
    }
    ctx.stroke();

    ctx.strokeStyle = "dimgray";

    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(width/2,height);

    ctx.moveTo(0,height/2);
    ctx.lineTo(width,height/2);
    ctx.stroke();
}

window.onload=init();
