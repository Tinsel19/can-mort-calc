
// variables section 
var mortgageInput = document.querySelector(".test");
var mrange = document.querySelector("#range1");

var percentInput = document.querySelector("#percent");
var prange = document.querySelector("#percentR");

var amInput = document.querySelector("#amon");
var amonr = document.querySelector("#amonr");

var mresult = document.querySelector("#mresult");

var tPayment = document.querySelector(".t-payment");


var iPaid = document.querySelector(".i-paid");
var pPaid = document.querySelector(".p-paid");

var eaYears = document.querySelector(".ea-years");

var beot = document.querySelector(".beot");


mrange.value = parseFloat((mortgageInput.value).replace(/[^0-9-.]/g, ''));
mrange.value = Number(50000);
mortgageInput.value = (50000).toLocaleString("en-US");

var p = 0;
var n = 0;
var rate = 0;
var r = 0;
var m = 0;
var plist = [];
var prlist = [];


p = mrange.value;
rate = parseFloat(percentInput.value/100);
r = ((1+(rate/2))**2)**(1/12)-1;
n = amonr.value * 12;
m = (p * r)/ (1-(1 + r)** (-n)) ;

tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
eaYears.textContent = (amonr.value).toString() + " years";
amInput.value = amonr.value;

prlist.push(Number(p*r) );
plist.push(Number(p));
var tstp = plist[plist.length-1] - (m - (p *r));
plist.push(tstp);
var yearL = amonr.value;

console.log(tstp)

for (i = 0; i< 57; i++) {
    prlist.push(Number(plist[plist.length-1] * r) );
    tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
    plist.push(tstp);
}

beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
console.log(plist[plist.length-1])
console.log( (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US"));



function blurInput() {
    mortgageInput.type = "text";
    mortgageInput.value = Number(mortgageInput.value).toLocaleString("en-US");
    mrange.value = parseFloat((mortgageInput.value).replace(/[^0-9-.]/g, ''));

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + (Math.round(m)).toLocaleString("en-US");
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}

function focusInput() {
    mortgageInput.value = parseFloat((mortgageInput.value).replace(/[^0-9-.]/g, '')); 
    mortgageInput.type = "number";

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}



// change mortgage value
function changeMortgage() {
    mortgageInput.value =Number(mrange.value).toLocaleString("en-US") ;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2)) ** 2) ** (1/12) -1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}


// percent range and input field section 
prange.value = percentInput.value;
function changePercent () {
    percentInput.value = prange.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;
    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Number(m).toLocaleString("en-US") ;
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}
function changePr () {
    prange.value = percentInput.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Number(m).toLocaleString("en-US") ;
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";


    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}
// Amortization range and input field section 
amonr.value = amInput.value;
function changeAr () {
    amonr.value = amInput.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Number(m).toLocaleString("en-US") ;
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}
function changeAi () {
    amInput.value = amonr.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = amonr.value * 12;
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Number(m).toLocaleString("en-US") ;
    iPaid.textContent = "$" + ((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + ((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    console.log(tstp)

    for (i = 0; i< yearL; i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
    }

    beot.textContent = "$" + (plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}