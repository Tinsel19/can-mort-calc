


// variables section 
var mortgageInput = document.querySelector(".test");
var mrange = document.querySelector("#range1");

var percentInput = document.querySelector("#percent");
var prange = document.querySelector("#percentR");

var amInput = document.querySelector("#amon");
var amonr = document.querySelector("#amonr");
var monthly = document.querySelector("#monthly");

var mresult = document.querySelector("#mresult");

var tPayment = document.querySelector(".t-payment");

var iPaid = document.querySelector(".i-paid");
var pPaid = document.querySelector(".p-paid");

var eaYears = document.querySelector(".ea-years");

var beot = document.querySelector(".beot");

// let myChart = document.querySelector("#myChart").getContext("2d");


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
var intPaid = [];
var yList = [];
var x = [];
var y = [];

function sumArray(array) {
    let sum = 0; 
    array.forEach(item => {
      sum += item;
    });
  
    console.log(sum); 
    return sum;
}

var sumpList = [];
var sumiList = [];

p = mrange.value;
rate = parseFloat(percentInput.value/100);
r = ((1+(rate/2))**2)**(1/12)-1;
n = (amonr.value * 12) + Number(monthly.value);
m = (p * r)/ (1-(1 + r)** (-n));

tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
eaYears.textContent = (amonr.value).toString() + " years";
amInput.value = amonr.value;

prlist.push(Number(p * r));
x.push(Number(p * r));
plist.push(Number(p));
y.push(Number(p));

var tstp = plist[plist.length-1] - (m - (p *r));
plist.push(tstp);
var yearL = amonr.value;

for (i = 0; (i< n); i++) {
    prlist.push(Number(plist[plist.length-1] * r) );
    tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
    plist.push(tstp);
    sumpList.push(sumArray(prlist));
    
    intPaid.push((m - (prlist[prlist.length-1])));
    sumiList.push(sumArray(intPaid));

}

plist.pop();
plist.pop();
beot.textContent = "$" + Number(plist[Math.round(plist.length/10) -1].toFixed(2)).toLocaleString("en-US");

function blurInput() {
    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    mortgageInput.type = "text";
    mortgageInput.value = Number(mortgageInput.value).toLocaleString("en-US");
    mrange.value = parseFloat((mortgageInput.value).replace(/[^0-9-.]/g, ''));

    p = mrange.value;
    rate = parseFloat(percentInput.value/100);
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)** (-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";
    amInput.value = amonr.value;

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;
    sumiList = [];
    sumpList = [];
    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }

    yList = [];
    plist.pop();
    plist.pop();
    prlist.pop();   

    for (i = 0; i < n+1; i++) {
        yList.push(i);
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

    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}

function focusInput() {
    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    mortgageInput.value = parseFloat((mortgageInput.value).replace(/[^0-9-.]/g, '')); 
    mortgageInput.type = "number";

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }

    yList = [];
    plist.pop();
    plist.pop();
    prlist.pop();   

    for (i = 0; i < n+1; i++) {
        yList.push(i);
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

    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}


// change mortgage value
function changeMortgage() {
    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    mortgageInput.value =Number(mrange.value).toLocaleString("en-US") ;

    
    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2)) ** 2) ** (1/12) -1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    yList = []
    plist.pop();
    plist.pop();
    prlist.pop();   
    for (i = 0; i < n+1; i++) {
        yList.push(i);
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

    beot.textContent = "$" + Number(plist[(plist.length/6) - 1].toFixed(2)).toLocaleString("en-US");
    prlist = [];
    plist = [];
    intPaid = []
}


// percent range and input field section 
prange.value = percentInput.value;
function changePercent () {

    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    percentInput.value = prange.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;
    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";

    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }

    yList = [];
    plist.pop();
    plist.pop();
    prlist.pop();   

    for (i = 0; i < n+1; i++) {
        yList.push(i);
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

    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}
function changePr () {

    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    prange.value = percentInput.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";


    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }

    yList = []
    plist.pop();
    plist.pop();
    prlist.pop();   
    for (i = 0; i < n+1; i++) {
        yList.push(i);
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

    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}

// Amortization range and input field section 
amonr.value = amInput.value;
function changeAr () {
    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    amonr.value = amInput.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";


    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    yList = [];
    plist.pop();
    plist.pop();
    prlist.pop();   

    for (i = 0; i < n+1; i++) {
        yList.push(i);
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
    
    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");

}

function changeAm () {
    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    amonr.value = amInput.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";


    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }
    yList = [];
    plist.pop();
    plist.pop();
    prlist.pop(); 
    
    console.log("HHHHHHHHHHHHHHHHhh")
    console.log("sum" + sumiList.length)

    for (i = 0; i < n+1; i++) {
        yList.push(i);
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
    
    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");

}

function changeAi () {
    prlist = [];
    plist = [];
    intPaid = [];
    // prlist.push(x[0]);
    // plist.push(y[0]);

    amInput.value = amonr.value;

    p = mrange.value;
    rate = parseFloat(percentInput.value/100) ;
    r = ((1+(rate/2))**2)**(1/12)-1;
    n = (amonr.value * 12) + Number(monthly.value);
    m = (p * r)/ (1-(1 + r)**(-n)) ;

    tPayment.textContent = "$" + Number(m).toLocaleString("en-US");
    mresult.textContent = "$" + Math.round(m).toLocaleString("en-US");
    iPaid.textContent = "$" + Number((r * p).toFixed(2)).toLocaleString("en-US");
    pPaid.textContent = "$" + Number((m - (r*p)).toFixed(2)).toLocaleString("en-US");
    eaYears.textContent = (amonr.value).toString() + " years";


    prlist.push(Number(p*r) );
    plist.push(Number(p));
    var tstp = plist[plist.length-1] - (m - (p *r));
    plist.push(tstp);
    var yearL = amonr.value;

    sumiList = [];
    sumpList = [];

    for (i = 0; (i< n); i++) {
        prlist.push(Number(plist[plist.length-1] * r) );
        tstp = plist[plist.length -1] - (m - (prlist[prlist.length-1]));
        plist.push(tstp);
        sumpList.push(sumArray(prlist));
        
        intPaid.push((m - (prlist[prlist.length-1])));
        sumiList.push(sumArray(intPaid));
    }

    yList = [];
    plist.pop();
    plist.pop();
    prlist.pop();   
    for (i = 0; i < n+1; i++) {
        yList.push(i);
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
    beot.textContent = "$" + Number(plist[plist.length - 1].toFixed(2)).toLocaleString("en-US");
}

yList = []

for (i = 0; i < n+1; i++) {
    yList.push(i);
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
