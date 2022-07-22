let quad=null;
let xhyouki =null;

let once=true;

function init() {
    quad = document.getElementById("quadratic").innerHTML;
    //xhyouki =document.getElementById("solution-value").innerHTML;
    xhyouki ='<mjx-container class="MathJax CtxtMenu_Attached_0" jax="CHTML" tabindex="0" ctxtmenu_counter="5" style="font-size: 124.9%; position: relative;"><mjx-math class="MJX-TEX" aria-hidden="true"><mjx-mi class="mjx-i"><mjx-c class="mjx-c1D465 TEX-I"></mjx-c></mjx-mi><mjx-mo class="mjx-n" space="4"><mjx-c class="mjx-c3D"></mjx-c></mjx-mo></mjx-math><mjx-assistive-mml unselectable="on" display="inline"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>=</mo></math></mjx-assistive-mml></mjx-container>';
    console.log(xhyouki);
}


function update() {
    if(once){
        init();
        once =false;
    }
    const a = Number(document.getElementById("numa").value);
    const b = Number(document.getElementById("numb").value);
    const c = Number(document.getElementById("numc").value);

    const sovType = document.getElementById("solution-type");
    const sovValue = document.getElementById("solution-value"); 

    sovValue.innerHTML = xhyouki + " ";

    if (a != 0) {
        document.getElementById("quadratic").innerHTML=quad;

        const D = b * b - 4 * a * c;    

        if (D == 0) {
            sovType.innerText = "重解";

            sovValue.innerHTML += String((-b / (2 * a)));
        }
        else if (D > 0) {
            sovType.innerText = "異なる２数の解";

            const rootD = Math.sqrt(D);
            sovValue.innerHTML += String((-b + rootD) / (2 * a)) + ' , ' + String((-b - rootD) / (2 * a));
        }
        else {
            sovType.innerText = "虚数";

            const rootD = Math.sqrt(-D);
            sovValue.innerHTML += String((-b + rootD) / (2 * a)) + 'i' + ' , ' + String((-b - rootD) / (2 * a)) + 'i';
        }
    }
    else {
        document.getElementById("quadratic").innerHTML = "";

        if (b != 0) {
            sovType.innerText = "一元一次方程式";
            sovValue.innerHTML += String(-c / b);
        }
        else {
            if (c == 0) {
                sovType.innerText = "解はすべての実数";
                sovValue.innerHTML ="";
            }
            else {
                sovType.innerText = "解なし";
                sovValue.innerHTML ="";
            }
        }
    }
}