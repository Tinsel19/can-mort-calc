

// variables section 
var homePrice = document.querySelector("#home-price");
var hrange = document.querySelector("#homep-range");

var downPayment = document.querySelector("#down-payment");
var drange = document.querySelector("#downp-range");



var rateInput = document.querySelector("#r-input");
var rateRange = document.querySelector("#r-range");

var amInput = document.querySelector("#year-input");
var amonr = document.querySelector("#amonr");
var mrInput = document.querySelector("#month-input");

var mresult = document.querySelector("#mresult");

var tPayment = document.querySelector(".t-payment");

var iPaid = document.querySelector(".i-paid");
var pPaid = document.querySelector(".p-paid");
var eaYears = document.querySelector(".ea-years");

var beot = document.querySelector(".beot");
var netMortgage = document.querySelector("#net-mortage");
var mortInsuarance = document.querySelector("#mort-insurance");
var intPaid = document.querySelector("#interest-paid");
var balanceEndOfTerm = document.querySelector("#beot");
var effectiveAmort = document.querySelector("#eff-amort");

// let myChart = document.querySelector("#myChart").getContext("2d");


hrange.value = Number(500000);
homePrice.value = parseFloat((hrange.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
// homePrice.value = (50000).toLocaleString("en-US");  

var p = 0;
var n = 0;
var rate = 0;
var r = 0;
var m = 0;
var plist = [];
var prlist = [];
var intPaid = [];
var yList = [];
var x = [];
var y = [];

var sumpList = [];
var sumiList = [];

function sumArray(array) {
    let sum = 0; 
    array.forEach(item => {
      sum += item;
    });
    return sum;
}



function kami (hrangeValue, drangeValue, rinputValue, amonrValue) {
    
    if (Number(hrangeValue) < Number(drangeValue) || hrangeValue === "NaN") {
        p = 0;
    } else {
        p = Number(hrangeValue) - Number(drangeValue);
    }

    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonrValue * 12) + Number(mrInput.value);
    m = (p * r)/ (1-(1 + r)** (-n));
    return m;
}


p = Number(hrange.value) - Number(drange.value);
rate = parseFloat(rateInput.value/100);
r = ((1+(rate/2))**2)**(1/12)-1;
n = (amonr.value * 12) + Number(mrInput.value) ;
prlist.push(Number(p * r));

plist.push(Number(p));
// console.log(plist)

var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
plist.push(tstp);

for (i = 0; (i < n); i++) {
    prlist.push(Number(plist[plist.length -1] * r));
    tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
    plist.push(tstp);
    sumpList.push(sumArray(prlist));
    
    intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
    
    sumiList.push(sumArray(intPaid));
}
console.log(intPaid.length)
plist.pop();
plist.pop();

yList = []

for (i = 0; i < n+1; i++) {
    
    yList.push(i);
} 
if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
    sumiList = [];
    sumpList = [];
    plist = [];    
} 

new Chart(ctx, {
    type: "line",
    data: {
        labels: yList,
        datasets: [
             
            {
                label:"Interest Paid",
                data: sumiList,
                borderWidth : .1,
                borderColor: "white",
                fill: false,
                lineTension: .1,
            },
            {
                label: 'Principal Paid',
                data: sumpList,
                backgroundColor: "transparent",
                borderWidth: .1,
                borderColor: "blue",
                fill:false
            },
            {
                label: 'Mortgage paid',
                data: plist,
                backgroundColor: "transparent",
                borderWidth: .1,
                borderColor: "orange",
                fill: false,
                lineTension: .1
                
            }
            
        ]
    },
    options: {
        title: {
            display:true,
            text: "Amortization",
            fontSize:25
        },
        layout: {
            padding: {
                top: 50,
                left: 20,
                right: 20,
                bottom: 50
            }
        }
    },
});

amonr.value = amInput.value;

mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString("en-US");
pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

effectiveAmort.textContent = (amonr.value ) + " years";
beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");


function changeHprice() {
    hrv = hrange.value;
    drv = drange.value;

    homePrice.value = parseFloat((hrange.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });


    
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
    
}

// focus home price input 
function focusHinput() {
    hrange.value = parseFloat((homePrice.value).replace(/[^0-9-.]/g, ''));
    homePrice.value = parseFloat((homePrice.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

// blur down price input 
function blurHinput () {

    hrange.value = parseFloat((homePrice.value).replace(/[^0-9-.]/g, ''));
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    homePrice.value = parseFloat((homePrice.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

// focus down payment input 
function focusDinput () {
    // alert("8686")
    // downPayment.type = "number";
}
// blur down payment input 
function blurDinput () {
    downPayment.type = "text";
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    }
    
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];        
    };

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

// change down payment input price from slider function 
function changeDprice () {
    drv = drange.value;
    downPayment.value = parseFloat((drange.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    };
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    };
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

function changePercent (evt) {
    switch (evt.target.value) {
        case "5%":
            x = Math.round(hrange.value * 0.05);
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
            
            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();

            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });
            break;

        case "10%":
            x = Math.round(hrange.value * 0.1);
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));

            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
            pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
            netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

            effectiveAmort.textContent = (amonr.value ) + " years";
            beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
            balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");

            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });

            break;

        case "15%":
            x = Math.round(hrange.value * 0.15);
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
            pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
            netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

            effectiveAmort.textContent = (amonr.value ) + " years";
            beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
            balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");

            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });
            break;

        case "20%":
            x = Math.round(hrange.value * 0.2);
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
            pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
            netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

            effectiveAmort.textContent = (amonr.value ) + " years";
            beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
            balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });
            break;

        case "35%":
            x = Math.round(hrange.value * 0.35);
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
            pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
            netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

            effectiveAmort.textContent = (amonr.value ) + " years";
            beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
            balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");

            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });
            break;
        case "50%":
            x = Math.round(hrange.value * 0.5);
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
            pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
            netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

            effectiveAmort.textContent = (amonr.value ) + " years";
            beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
            balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });
            break;
        case "100%":
            x = Math.round(hrange.value );
            downPayment.value = x;
            downPayment.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
            drange.value = parseFloat((downPayment.value).replace(/[^0-9-.]/g, ''));
            mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
            pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
            netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

            effectiveAmort.textContent = (amonr.value ) + " years";
            beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
            balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
            sumiList = [];
            sumpList = [];
            yList = [];
            prlist = [];
            plist = [];
            intPaid = [];

            p = Number(hrange.value) - Number(drange.value);
            rate = parseFloat(rateInput.value/100);
            r = ((1+(rate/2))**2)**(1/12)-1;
            n = (amonr.value * 12) + Number(mrInput.value);
            prlist.push(Number(p * r));
            plist.push(Number(p));

            var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
            plist.push(tstp);

            for (i = 0; (i < n); i++) {
                prlist.push(Number(plist[plist.length -1] * r));
                tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
                plist.push(tstp);
                sumpList.push(sumArray(prlist));
                intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
                sumiList.push(sumArray(intPaid));
            }
            plist.pop();
            plist.pop();

            yList = []

            for (i = 0; i < n+1; i++) {
                
                yList.push(i);
            } 
            if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
                sumiList = [];
                sumpList = [];
                plist = [];
                
            } 
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: yList,
                    datasets: [
                        
                        {
                            label:"Interest Paid",
                            data: sumiList,
                            borderWidth : .1,
                            borderColor: "white",
                            fill: false,
                            lineTension: .1,
                        },
                        {
                            label: 'Principal Paid',
                            data: sumpList,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "blue",
                            fill:false
                        },
                        {
                            label: 'Mortgage paid',
                            data: plist,
                            backgroundColor: "transparent",
                            borderWidth: .1,
                            borderColor: "orange",
                            fill: false,
                            lineTension: .1
                            
                        }
                        
                    ]
                },
                options: {
                    title: {
                        display:true,
                        text: "Amortization",
                        fontSize:25
                    },
                    layout: {
                        padding: {
                            top: 50,
                            left: 20,
                            right: 20,
                            bottom: 50
                        }
                    }
                },
            });
            break;
        default:
            break;
    }
}


// change the rate slider value based on rate input value 
function changeIr () {
    rateRange.value = rateInput.value;
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];
        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

// change the rate input value based on rate slider value 
function changeRr () {
    rateInput.value = rateRange.value;
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];
        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

// change amortization range value from the amortiation input value function 
function changeAr () {
    amonr.value = amInput.value;
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];
        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

function changeAi () {
    amInput.value = amonr.value;
    
    sumiList = [];
    sumpList = [];
    yList = [];
    prlist = [];
    plist = [];
    intPaid = [];

    p = Number(hrange.value) - Number(drange.value);
    rate = parseFloat(rateInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(mrInput.value);
    prlist.push(Number(p * r));
    plist.push(Number(p));

    var tstp = plist[plist.length-1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (p * r));
    plist.push(tstp);

    for (i = 0; (i < n); i++) {
        prlist.push(Number(plist[plist.length -1] * r));
        tstp = plist[plist.length -1] - (Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1]) );
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        intPaid.push((Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)) - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    plist.pop();
    plist.pop();

    yList = []

    for (i = 0; i < n+1; i++) {
        
        yList.push(i);
    } 
    if (Number(hrange.value) < Number(drange.value) || hrange.value === "NaN") {
        sumiList = [];
        sumpList = [];
        plist = [];
        
    } 

    new Chart(ctx, {
        type: "line",
        data: {
            labels: yList,
            datasets: [
                
                {
                    label:"Interest Paid",
                    data: sumiList,
                    borderWidth : .1,
                    borderColor: "white",
                    fill: false,
                    lineTension: .1,
                },
                {
                    label: 'Principal Paid',
                    data: sumpList,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "blue",
                    fill:false
                },
                {
                    label: 'Mortgage paid',
                    data: plist,
                    backgroundColor: "transparent",
                    borderWidth: .1,
                    borderColor: "orange",
                    fill: false,
                    lineTension: .1
                    
                }
                
            ]
        },
        options: {
            title: {
                display:true,
                text: "Amortization",
                fontSize:25
            },
            layout: {
                padding: {
                    top: 50,
                    left: 20,
                    right: 20,
                    bottom: 50
                }
            }
        },
    });
    mresult.innerHTML = "$" + Math.round(kami(hrange.value, drange.value, rateInput.value, amonr.value)).toLocaleString();
    pPaid.textContent = "$" + (kami(hrange.value, drange.value, rateInput.value, amonr.value).toFixed(2)).toLocaleString("en-US");
    netMortgage.textContent = "$" +  (Number(hrange.value) - Number(drange.value)).toLocaleString("en-US");

    effectiveAmort.textContent = (amonr.value ) + " years";
    beot.textContent = "$" + sumpList[10].toFixed(2).toLocaleString("en-US");
    balanceEndOfTerm.textContent = "$" + plist[12].toFixed(2).toLocaleString("en-US");
}

