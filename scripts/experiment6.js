function draw(){
    const canvas=document.getElementById('graph');
    const ctx=canvas.getContext('2d');

}

function init(){
    const canvas=document.getElementById('graph');
    const ctx=canvas.getContext('2d');

    resize();

    const width =canvas.width;
    const height =canvas.height;
    
    console.log(width);
    ctx.storkeStyle = "silver";
    
    ctx.beginPath();
    ctx.moveTo(width/2,0);
    ctx.lineTo(300,height);
    ctx.stroke();
    for(let i = 0; i< 100;i++)
    {
    }
}

function resize(canvas) {
    const diswidth=canvas.clientWidht;
    const disheight=canvas.clientHeight;

    if(canvas.width != diswidth||canvas.height!=disheight)
    {
        canvas.width=diswidth;
        canvas.height=disheight;
    }
}

window.onload=init();
