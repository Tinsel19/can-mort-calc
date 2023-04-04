
var landPrice = document.querySelector("#land-price");
var landRange = document.querySelector("#land-range");
var lResult = document.querySelector("#lresult");
var provincial = document.querySelector("#provincial");
var municipal = document.querySelector("#municipal");
var rebate = document.querySelector("#rebate");
var x, firstMarginal, secondMarginal, thirdMarginal, forthMarginal, fifthMarginal, y
landPrice.value = parseFloat((landRange.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");



function mResult (y) {
    if ( y <= 55000) {
        y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
        firstMarginal = Math.round(55000 * (0.50/100) );
        return ( firstMarginal ) ;
    }
    if ( y > 55000 & y <= 250000) {
        y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
        secondMarginal = Math.round((y - 55000) * (1/100)) + firstMarginal;
        return (secondMarginal ) ;        
    }
    if ( y > 250000 & y <= 400000) {
        y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
        firstMarginal = Math.round(55000 * (0.50/100) );
        secondMarginal = Math.round((250000 - 55000) * (1/100));
        thirdMarginal = Math.round((y - 250000) * (1.5/100)) + firstMarginal + secondMarginal ;
        return (  thirdMarginal) ;
    }
    if ( y > 400000 & y <= 2000000) {
        y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
        firstMarginal = Math.round(55000 * (0.50/100) );
        secondMarginal = Math.round((250000 - 55000) * (1/100));
        thirdMarginal = Math.round(400000 * (1.5/100)) 
        forthMarginal = Math.round((y - 400000) * (2/100)) + firstMarginal + secondMarginal + thirdMarginal;
        return ( forthMarginal) ;
    }
    if ( y > 2000000) {
        y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
        firstMarginal = Math.round(55000 * (0.50/100) );
        secondMarginal = Math.round((250000 - 55000) * (1/100));
        thirdMarginal = Math.round(400000 * (1.5/100))
        forthMarginal = Math.round((2000000 - 400000) * (2/100))
        fifthMarginal = Math.round((y - 2000000) * (2.5/100)) + firstMarginal + secondMarginal + thirdMarginal + forthMarginal;
        return (fifthMarginal );
    }     
}


y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
lResult.textContent =  "$" +  (mResult(y)* 2).toLocaleString("en-US");
provincial.textContent ="+ $" + Math.round((mResult(y)/2 )*2).toLocaleString("en-US");
municipal.textContent ="+ $" + Math.round((mResult(y)/2) *2).toLocaleString("en-US");





function focusLinput () {
    x = landPrice.value;
    landPrice.type = "number";
    landPrice.value = parseFloat((x).replace(/[^0-9-.]/g, '')) ;
    y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
    lResult.textContent =  "$" +  (mResult(y)* 2).toLocaleString("en-US");
    provincial.textContent ="+ $" + Math.round((mResult(y)/2 )*2).toLocaleString("en-US");
    municipal.textContent ="+ $" + Math.round((mResult(y)/2) *2).toLocaleString("en-US");
}

function blurLinput () {
    x = landPrice.value
    landPrice.type = "text";
    landPrice.value = parseFloat((x).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
    lResult.textContent =  "$" +  (mResult(y)* 2).toLocaleString("en-US");
    provincial.textContent ="+ $" + Math.round((mResult(y)/2 )*2).toLocaleString("en-US");
    municipal.textContent ="+ $" + Math.round((mResult(y)/2) *2).toLocaleString("en-US");
}

function changeLprice() {
    landPrice.type = "text";
    landPrice.value = parseFloat((landRange.value).replace(/[^0-9-.]/g, '')).toLocaleString("en-US");
    y = parseFloat((landPrice.value).replace(/[^0-9-.]/g, '')) ;
    lResult.textContent =  "$" +  (mResult(y)* 2).toLocaleString("en-US");
    provincial.textContent ="+ $" + Math.round((mResult(y)/2 )*2).toLocaleString("en-US");
    municipal.textContent ="+ $" + Math.round((mResult(y)/2) *2).toLocaleString("en-US");
}