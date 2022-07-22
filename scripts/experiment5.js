function update () {
    const a = Number(document.getElementById("numa").value);
    const b = Number(document.getElementById("numb").value);
    const c = Number(document.getElementById("numc").value);

    const sovType = document.getElementById("solution-type");
    const sovValue = document.getElementById("solution-value");

    console.log(a);

    if( a != 0)
    {
        const D = b*b - 4*a*c;

        if( D == 0)
        {
            sovType.innerText = "重解";

            const rootD = Math.sqrt(D);
            sovValue.innerText = String((-b/(2*a)));
        }
        else if( D >0)
        {
            sovType.innerText = "異なる２数の解";

            const rootD = Math.sqrt(D);
            sovValue.innerText = String((-b + rootD)/(2*a)) +','+ String((-b-rootD)/(2*a));
        }
        else
        {
            sovType.innerText = "虚数";
            
            const rootD = Math.sqrt(-D);
            sovValue.innerText = String((-b + rootD)/(2*a))+'i' +','+ String((-b-rootD)/(2*a)) + 'i';
        }
    }
    else
    {
        if(b!=0)
        {
            sovType = "一元一次方程式";
            //sovValue.innerText;
        }
    }
}